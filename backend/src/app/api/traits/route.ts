// backend/src/app/api/traits/route.ts
import { getPrisma } from '../../../lib/prisma';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const prisma = await getPrisma();
      const category = (req as any).query.category as string | undefined;

      const where = category ? { category } : {};
      const traits = await prisma.traits.findMany({
        where,
        orderBy: { updated_at: 'desc' },
      });

      res.status(200).json({ traits });
    } catch (error) {
      console.error('[traits] error', error);
      res.status(500).json({ error: 'Failed to fetch traits' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}