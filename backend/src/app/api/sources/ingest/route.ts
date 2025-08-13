// backend/src/app/api/sources/ingest/route.ts
import { getPrisma } from '../../../../lib/prisma';
import OpenAI from 'openai';
import * as fs from 'node:fs';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const prisma = await getPrisma();
    const formData = await req.formData();
    const audioFile = formData.get('audio') as unknown as File;

    if (!audioFile) {
      return new Response(JSON.stringify({ error: 'No audio file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'OPENAI_API_KEY is not set' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Convert the audio file to a buffer
    const buffer = await audioFile.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    // Create a temporary file
    const tempFilePath = `/tmp/audio-${Date.now()}.wav`;
    fs.writeFileSync(tempFilePath, Buffer.from(uint8Array));

    // Transcribe the audio file using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath) as any,
      model: "whisper-1",
    });

    // Delete the temporary file
    fs.unlinkSync(tempFilePath);

    // Process the transcription and save the source to the database
    const source = await prisma.sources.create({
      data: {
        user_id: '42f21866-0cdb-40e8-b9f0-3f09fed57b4b', // Replace with the actual user ID
        type: 'file',
        title: audioFile.name,
        content_encrypted: Buffer.from(transcription.text), // Encrypt the content
      },
    });

    return new Response(JSON.stringify({ source, transcription: transcription.text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[sources/ingest] error', error);
    return new Response(JSON.stringify({ error: 'Failed to ingest source' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}