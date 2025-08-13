// backend/src/app/api/voice/speak/route.ts
import ElevenLabs from "elevenlabs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'ELEVENLABS_API_KEY is not set' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const { text, voiceId } = body;

    const elevenLabs = new ElevenLabsClient({
      apiKey: apiKey,
    });

    const voiceSettings = {
        stability: 0.5,
        similarity_boost: 0.5,
    }
    const audio = await elevenLabs.textToSpeech.generate({
      text: text,
      voice_id: voiceId || "pNInz6obpgDQGcfmxZJm",
      model_id: "eleven_monolingual_v1",
      voice_settings: voiceSettings,
    });

    return new Response(audio as any, {
      headers: { 'Content-Type': 'audio/mpeg' },
    });
  } catch (error) {
    console.error('[voice/speak] error', error);
    return new Response(JSON.stringify({ error: 'Failed to generate speech' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}