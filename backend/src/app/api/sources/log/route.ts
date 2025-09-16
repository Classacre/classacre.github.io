// backend/src/app/api/sources/log/route.ts
import { getPrisma } from '../../../../lib/prisma';
import { z } from 'zod';
import { encrypt } from '../../../../lib/crypto';
import { requireSession } from '../../../../lib/session';
import { enqueueEmbeddings } from '../../../../lib/jobs';

const BodySchema = z.object({
  type: z.string(),
  title: z.string(),
  content: z.string(),
});

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { session } = await requireSession(request as any);
    const userId: string = (session as any).user_id;
    const { type, title, content } = BodySchema.parse(await request.json());

    const { iv, encryptedData } = await encrypt(content);

    const source = await prisma.sources.create({
      data: {
        user_id: userId,
        type: type,
        title: title,
        content_encrypted: Buffer.from(encryptedData, 'hex'),
        iv: iv,
      },
    });

    // Enqueue embeddings job for this plaintext content
    const enqueue = await enqueueEmbeddings({
      sourceId: source.id,
      userId,
      text: content,
      category: type,
    });

    return new Response(JSON.stringify({ message: 'Source logged successfully', source, embeddingJob: enqueue }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[sources/log] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to log source' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}