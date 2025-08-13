import { streamText } from 'ai';
import { Readable } from 'stream';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from 'zod';

/* Prisma client is created at request-time with a runtime-only dynamic import to avoid
   TypeScript resolution conflicts between a generated local client and the installed package.
   We attach it to globalThis in dev to avoid multiple instances during hot reload. */

export const runtime = 'nodejs';

const BodySchema = z.object({
 messages: z.array(z.object({
   role: z.string(),
   content: z.any(),
 })),
 mode: z.string().optional(),
 speak: z.boolean().optional(),
});

export async function POST(req: Request) {
 try {
   const body = await req.json();
   const { messages } = BodySchema.parse(body);
 
   const apiKey = process.env.OPENROUTER_API_KEY;
   if (!apiKey) {
     return new Response(JSON.stringify({ error: 'OPENROUTER_API_KEY is not set' }), {
       status: 500,
       headers: { 'Content-Type': 'application/json' },
     });
   }
 
   const openrouter = createOpenRouter({ apiKey });
 
   // Ensure PrismaClient is only imported/constructed at runtime to avoid TS resolution issues
   // and to keep the dev global guard pattern safe.
   // Use the repo-local generated client shim to avoid requiring the @prisma/client runtime path.
   const prismaModule = await import('../../../generated/prisma');
   const PrismaClientCtor: any = (prismaModule as any).PrismaClient ?? (prismaModule as any).default ?? (prismaModule as any);
   const _global = globalThis as unknown as { __prisma?: any };
   const prisma = _global.__prisma ?? (_global.__prisma = new PrismaClientCtor());
 
   // Map incoming simple { role, content } messages into the model shape expected by the installed ai SDK.
   const modelMessages = messages.map((m: any) => ({
     role: m.role,
     content: typeof m.content === 'string' ? m.content : String(m.content),
   }));
 
   const stream = streamText({
     model: openrouter.chat('anthropic/claude-3.5-sonnet'),
     // cast to any because different ai SDK versions expect slightly different message shapes
     messages: modelMessages as any,
   });
 
   // The stream helper exposes convenience methods for Next.js route handlers.
   // Prefer toUIMessageStreamResponse() for UI-friendly streaming responses when available.
   // Fall back to a generic Response if the helper shape differs.
   // (Using `any` guards because the `ai` SDK versions vary.)
   // @ts-ignore
   if (typeof (stream as any).toUIMessageStreamResponse === 'function') {
     // @ts-ignore
     return (stream as any).toUIMessageStreamResponse();
   }
 
   // Manual ReadableStream fallback
   const encoder = new TextEncoder();
   const readableStream = new ReadableStream({
     async start(controller) {
       try {
         for await (const chunk of stream) {
           controller.enqueue(encoder.encode(chunk));
         }
         controller.close();
       } catch (e) {
         controller.error(e);
       }
     },
   });

   return new Response(readableStream, {
     headers: { 'Content-Type': 'text/plain' },
   });
 
   return new Response(JSON.stringify({ error: 'Streaming not supported by installed ai SDK version' }), {
     status: 500,
     headers: { 'Content-Type': 'application/json' },
   });
 } catch (error) {
   console.error('[chat/route] error', error);
   return new Response(JSON.stringify({ error: 'Failed to generate chat response' }), {
     status: 500,
     headers: { 'Content-Type': 'application/json' },
   });
 }
}