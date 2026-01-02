import { PrismaClient } from '@prisma/client';

async function check() {
  const prisma = new PrismaClient();
  try {
    const count = await prisma.product.count();
    console.log('--- DATABASE CHECK ---');
    console.log('Total Products in DB:', count);
    if (count > 0) {
      const all = await prisma.product.findMany({ select: { name: true } });
      console.log('Product Names:', all.map(p => p.name).join(', '));
    }
    console.log('----------------------');
  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

check();
