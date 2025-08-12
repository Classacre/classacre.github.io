// runtime-safe Prisma getter
export async function getPrisma() {
  const pm = await import('../generated/prisma');
  const PrismaClientCtor: any = (pm as any).PrismaClient ?? (pm as any).default ?? pm;
  const _global = globalThis as any;
  _global.__prisma = _global.__prisma ?? new PrismaClientCtor();
  return _global.__prisma;
}