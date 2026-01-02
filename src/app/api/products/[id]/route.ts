import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId || userId !== process.env.ADMIN_USER_ID) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await req.json();
    const product = await prisma.product.update({
      where: { id },
      data: body
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error('PUT_PRODUCT_ERROR:', error);
    return NextResponse.json({ 
      error: 'Failed to update product',
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth();
  if (!userId || userId !== process.env.ADMIN_USER_ID) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await prisma.product.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('DELETE_PRODUCT_ERROR:', error);
    return NextResponse.json({ 
      error: 'Failed to delete product',
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
