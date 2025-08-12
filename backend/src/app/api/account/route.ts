// backend/src/app/api/account/route.ts
import { getPrisma } from '../../../lib/prisma';

export default async function handler(
  req: any,
  res: any
) {
  if (req.method === 'DELETE') {
    try {
      const prisma = await getPrisma();
      const userId = (req as any).query.userId as string;

      // TODO: Implement logic to delete the user account and all associated data using prisma
      // Example:
      // await prisma.users.delete({ where: { id: userId } });

      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('[account/delete] error', error);
      res.status(500).json({ error: 'Failed to delete account' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}