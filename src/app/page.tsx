import { prisma } from '@/lib/prisma';
import HomeContent from '@/components/HomeContent';
import { Product } from '@/types/product';

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function Home() {
  let products: Product[] = [];

  try {
    // Optimized Query: Only fetch fields needed for the card
    const data = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        nameAr: true,
        price: true,
        currency: true,
        category: true,
        description: true,
        descriptionAr: true,
        imageUrl: true,
        // We don't need these heavy fields for the home page
        longDescription: false,
        longDescriptionAr: false,
        details: false,
        detailsAr: false,
        reviews: false, 
        createdAt: false,
        updatedAt: false,
      }
    });
    
    // Cast to Product type since we are purposefully omitting some optional fields
    products = data as unknown as Product[];
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return <HomeContent initialProducts={products} />;
}
