import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { reviews: true }
    });
    return NextResponse.json(products);
  } catch (error: any) {
    console.error('DATABASE_ERROR:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch products', 
      details: error.message,
      code: error.code 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  
  if (!userId || userId !== process.env.ADMIN_USER_ID) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: body
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
