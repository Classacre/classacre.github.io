// backend/src/app/api/traits/route.ts
import { getPrisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const prisma = await getPrisma();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;

    const where = category ? { category } : {};
    const traits = await prisma.traits.findMany({
      where,
      orderBy: { updated_at: 'desc' },
    });

    return NextResponse.json({ traits });
  } catch (error) {
    console.error('[traits] error', error);
    return NextResponse.json(
      { error: 'Failed to fetch traits' },
      { status: 500 }
    );
  }
}