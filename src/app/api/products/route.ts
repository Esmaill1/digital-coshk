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
  } catch (error) {
    console.error('DATABASE_ERROR:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch products', 
      details: error instanceof Error ? error.message : 'Unknown error'
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
    console.error('POST_PRODUCT_ERROR:', error);
    return NextResponse.json({ 
      error: 'Failed to create product',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
