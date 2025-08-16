// backend/src/app/api/voice/speak/route.ts
import { getPrisma } from '../../../../lib/prisma';
import { z } from 'zod';
import { ElevenLabs } from '@elevenlabs/elevenlabs-js';

const BodySchema = z.object({
  text: z.string(),
});

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { text } = BodySchema.parse(await request.json());

    // Implement TTS using ElevenLabs
    console.log('Generating speech for:', text);
    
    // Get the ElevenLabs API key from environment variables
    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      throw new Error('ElevenLabs API key is not configured. Please set ELEVENLABS_API_KEY in your environment variables.');
    }
    
    // Initialize ElevenLabs client with the API key
    // Note: The ElevenLabs SDK usage may vary; ensure you refer to the official documentation for the correct method.
    const elevenLabs = ElevenLabs({ apiKey });
    
    try {
      // Generate speech from text using ElevenLabs
      // Example usage based on common TTS SDK patterns (adjust according to ElevenLabs JS SDK documentation)
      const speechResponse = await elevenLabs.generate({
        text: text,
        voice: 'Charlotte', // Example voice; choose appropriate voice
        model: 'eleven_monolingual_v1', // Example model; use the correct one
        // Additional options like speed, stability can be added here
      });
    
      // Assuming speechResponse contains the audio data (e.g., a buffer or stream)
      // For example, speechResponse.audio might be the binary data
      const audioBuffer = speechResponse.audio; // Hypothetical property; check SDK docs
    
      // Return the audio response with appropriate headers
      return new Response(audioBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg', // Adjust MIME type based on output format
          'Cache-Control': 'public, max-age=0, must-revalidate',
        },
      });
    } catch (error: any) {
      console.error('TTS generation failed:', error);
      throw error;
    }
  } catch (error: any) {
    console.error('[voice/speak] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate audio' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}