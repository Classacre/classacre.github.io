// backend/src/app/api/voice/consent/route.ts
import { getPrisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const prisma = await getPrisma();
    const { userId, accepted, sampleIds } = await request.json();

    const consent_signed_at = accepted ? new Date() : null;

    const voiceProfile = await prisma.voice_profiles.upsert({
      where: { user_id: userId },
      update: { consent_signed_at: consent_signed_at, sample_meta: sampleIds },
      create: {
        user_id: userId,
        provider: 'elevenlabs', // Replace with the actual provider
        voice_id: 'default', // Replace with the actual voice ID
        consent_signed_at: consent_signed_at,
        sample_meta: sampleIds,
      },
    });

    return new Response(JSON.stringify({ message: 'Consent updated successfully', voiceProfile }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('[voice/consent] error', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to update consent' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}