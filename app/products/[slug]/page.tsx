import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import StructuredData from '../../components/StructuredData';
import { ProductDetailsData } from '../../components/ProductDetails';
import { ReviewsData } from '../../components/ReviewsSummary';
import { RelatedProduct } from '../../components/RelatedProducts';

// Helper function to generate product data from slug
function generateProductFromSlug(slug: string, id: string): ProductDetailsData {
  // Extract title from slug
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    id,
    title,
    brand: 'URBNO',
    sku: `URB-${slug.toUpperCase().substring(0, 8)}-${id}`,
    vendor: 'URBNO',
    description: `Limited numbered drop. Digital concepts built for the streets. Premium materials, hand-sketched design, and timeless utility.\n\nPerfect for everyday use with attention to detail and sustainable materials.`,
    price: 1999 + Math.floor(Math.random() * 2000),
    originalPrice: 2999 + Math.floor(Math.random() * 2000),
    currency: 'INR',
    inStock: true,
    stockCount: Math.floor(Math.random() * 15) + 1,
    variants: {
      color: {
        name: 'Color',
        options: [
          { id: 'black', name: 'Color', value: 'Black', available: true },
          { id: 'navy', name: 'Color', value: 'Navy', available: true },
          { id: 'olive', name: 'Color', value: 'Olive', available: Math.random() > 0.5 },
        ],
      },
      size: {
        name: 'Size',
        options: [
          { id: 'one', name: 'Size', value: 'One Size', available: true },
        ],
      },
    },
    features: [
      'Premium materials',
      'Hand-sketched design',
      'Limited edition',
      'Sustainable production',
    ],
    estimatedDelivery: '3-5 business days',
    taxInfo: 'Inclusive of all taxes',
  };
}

// Mock data - Replace with actual API calls
async function getProduct(slug: string): Promise<ProductDetailsData | null> {
  // In production, fetch from your API/database
  // This is mock data for demonstration
  const mockProducts: Record<string, ProductDetailsData> = {
    'shadow-pack-backpack': {
      id: '1',
      title: 'Shadow Pack Backpack',
      brand: 'URBNO',
      sku: 'URB-SPB-001',
      vendor: 'URBNO',
      description: 'Limited numbered drop. Digital concepts built for the streets. Premium materials, hand-sketched design, and timeless utility.\n\nPerfect for everyday carry with multiple compartments and adjustable straps. Made with sustainable materials and attention to detail.',
      price: 2999,
      originalPrice: 3999,
      currency: 'INR',
      inStock: true,
      stockCount: 8,
      variants: {
        color: {
          name: 'Color',
          options: [
            { id: 'black', name: 'Color', value: 'Black', available: true },
            { id: 'navy', name: 'Color', value: 'Navy', available: true },
            { id: 'olive', name: 'Color', value: 'Olive', available: false },
          ],
        },
        size: {
          name: 'Size',
          options: [
            { id: 'one', name: 'Size', value: 'One Size', available: true },
          ],
        },
      },
      features: [
        'Water-resistant material',
        'Multiple compartments',
        'Adjustable straps',
        'Limited edition numbered',
        'Hand-sketched design',
      ],
      estimatedDelivery: '3-5 business days',
      taxInfo: 'Inclusive of all taxes',
    },
  };

  // If product exists in mock data, return it
  if (mockProducts[slug]) {
    return mockProducts[slug];
  }

  // Otherwise, generate a product from the slug
  // In production, you would fetch from your API/database here
  return generateProductFromSlug(slug, slug);
}

async function getProductImages(slug: string): Promise<string[]> {
  // In production, fetch from your API/database
  const mockImages: Record<string, string[]> = {
    'shadow-pack-backpack': [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
    ],
  };

  // If specific images exist, return them
  if (mockImages[slug]) {
    return mockImages[slug];
  }

  // Otherwise, return default product images
  return [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop',
  ];
}

async function getReviews(productId: string): Promise<ReviewsData> {
  // In production, fetch from your API/database
  return {
    averageRating: 4.5,
    totalReviews: 24,
    ratingDistribution: {
      5: 12,
      4: 8,
      3: 3,
      2: 1,
      1: 0,
    },
    reviews: [
      {
        id: '1',
        author: 'Alex M.',
        rating: 5,
        title: 'Perfect backpack!',
        comment: 'Love the design and quality. The compartments are well thought out and the material feels premium. Highly recommend!',
        date: '2024-01-15',
        verified: true,
      },
      {
        id: '2',
        author: 'Sarah K.',
        rating: 4,
        title: 'Great quality',
        comment: 'Really happy with my purchase. The backpack is sturdy and looks great. Only minor issue is the strap adjustment could be easier.',
        date: '2024-01-10',
        verified: true,
      },
      {
        id: '3',
        author: 'Mike R.',
        rating: 5,
        comment: 'Amazing product! Worth every penny. The limited edition numbering is a nice touch.',
        date: '2024-01-05',
        verified: true,
      },
    ],
  };
}

async function getRelatedProducts(productId: string): Promise<RelatedProduct[]> {
  // In production, fetch from your API/database
  return [
    {
      id: '2',
      title: 'Numbered Hoodie',
      price: 2499,
      originalPrice: 2999,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop',
      slug: 'numbered-hoodie',
    },
    {
      id: '3',
      title: 'URBNO Cap',
      price: 999,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=900&auto=format&fit=crop',
      slug: 'urbno-cap',
    },
    {
      id: '4',
      title: 'Paper Tote',
      price: 799,
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900&auto=format&fit=crop',
      slug: 'paper-tote',
    },
    {
      id: '5',
      title: 'Canvas Sneaker',
      price: 3499,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=900&auto=format&fit=crop',
      slug: 'canvas-sneaker',
    },
  ];
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://urbno.com';
  const images = await getProductImages(params.slug);

  return {
    title: `${product.title} | URBNO`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.substring(0, 160),
      images: images.length > 0 ? [{ url: images[0], width: 1200, height: 1500 }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description.substring(0, 160),
      images: images.length > 0 ? [images[0]] : [],
    },
    alternates: {
      canonical: `${baseUrl}/products/${params.slug}`,
    },
  };
}

// Client component for product page interactions
import ProductPageClient from './ProductPageClient';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  const images = await getProductImages(params.slug);
  const reviews = await getReviews(product?.id || '');
  const relatedProducts = await getRelatedProducts(product?.id || '');

  if (!product) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://urbno.com';

  // Generate JSON-LD structured data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: images,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'URBNO',
    },
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}/products/${params.slug}`,
      priceCurrency: product.currency || 'INR',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    aggregateRating: reviews.totalReviews > 0
      ? {
        '@type': 'AggregateRating',
        ratingValue: reviews.averageRating,
        reviewCount: reviews.totalReviews,
        bestRating: 5,
        worstRating: 1,
      }
      : undefined,
  };

  return (
    <>
      {/* Structured Data */}
      <StructuredData type="Product" data={productSchema} />
      {reviews.totalReviews > 0 && (
        <StructuredData
          type="AggregateRating"
          data={{
            '@type': 'AggregateRating',
            ratingValue: reviews.averageRating,
            reviewCount: reviews.totalReviews,
            bestRating: 5,
            worstRating: 1,
          }}
        />
      )}

      {/* Client Component for Interactive Features */}
      <ProductPageClient
        product={product}
        images={images}
        reviews={reviews}
        relatedProducts={relatedProducts}
        slug={params.slug}
      />
    </>
  );
}

