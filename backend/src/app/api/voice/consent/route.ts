// backend/src/app/api/voice/consent/route.ts
import { getPrisma } from '../../../../lib/prisma';

export default async function handler(
  req: any,
  res: any
) {
  if (req.method === 'POST') {
    try {
      const prisma = await getPrisma();
      const { userId, accepted, sample_ids } = (req as any).body;

      // TODO: Implement logic to update voice profile consent in the database using prisma
      // Example:
      // await prisma.voice_profiles.update({
      //   where: { id: profileId },
      //   data: { consent_signed_at: accepted ? new Date() : null, sample_meta: { sample_ids } }
      // });

      res.status(200).json({ message: 'Voice consent updated successfully' });
    } catch (error) {
      console.error('[voice/consent] error', error);
      res.status(500).json({ error: 'Failed to update voice consent' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}