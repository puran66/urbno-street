# Product Details Page - Quick Start Guide

## 🚀 Getting Started

### 1. Test the Product Page

Visit: `http://localhost:3000/products/shadow-pack-backpack`

This will show the complete PDP with all features.

### 2. Link Product Cards to PDP

Update your `ProductCard` component in `app/page.tsx` to link to product pages:

```tsx
// In ProductCard component, wrap the card or add onClick:
import { useRouter } from 'next/navigation';

// Inside component:
const router = useRouter();

// Add to card:
onClick={() => router.push(`/products/${product.slug || product.id}`)}
```

Or use Next.js Link:
```tsx
import Link from 'next/link';

<Link href={`/products/${product.slug}`}>
  {/* Product card content */}
</Link>
```

### 3. Generate Product Slugs

Add a `slug` field to your Product interface:

```typescript
interface Product {
  id: number;
  slug: string; // Add this
  title: string;
  // ... rest
}
```

Generate slugs from titles:
```typescript
const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
```

### 4. Connect to Your API

Replace mock functions in `app/products/[slug]/page.tsx`:

```typescript
async function getProduct(slug: string) {
  const res = await fetch(`${process.env.API_URL}/products/${slug}`);
  if (!res.ok) return null;
  return res.json();
}
```

### 5. Update Sitemap Dynamically

Fetch all product slugs and add to sitemap:

```typescript
// In app/sitemap.ts
const products = await fetchAllProductSlugs();
const productRoutes = products.map(slug => `/products/${slug}`);
```

---

## 📁 File Structure

```
app/
├── components/
│   ├── ProductCarousel.tsx      ✅ Image carousel
│   ├── ProductDetails.tsx       ✅ Product info & variants
│   ├── StickyBuyBar.tsx         ✅ Mobile sticky bar
│   ├── ReviewsSummary.tsx       ✅ Reviews display
│   ├── RelatedProducts.tsx      ✅ Related products
│   ├── WriteReviewModal.tsx     ✅ Review form
│   └── StructuredData.tsx       ✅ JSON-LD (updated)
├── products/
│   └── [slug]/
│       ├── page.tsx             ✅ Server component
│       └── ProductPageClient.tsx ✅ Client component
└── globals.css                  ✅ Utilities (updated)
```

---

## 🎨 Component Usage Examples

### ProductCarousel
```tsx
<ProductCarousel
  images={['/img1.jpg', '/img2.jpg']}
  alt="Product name"
  productTitle="Product Title"
  onImageChange={(index) => console.log('Image:', index)}
/>
```

### ProductDetails
```tsx
<ProductDetails
  product={productData}
  onAddToCart={(variants, qty) => addToCart(product.id, variants, qty)}
  onVariantChange={(selections) => updatePrice(selections)}
/>
```

### StickyBuyBar
```tsx
<StickyBuyBar
  price={2999}
  originalPrice={3999}
  selectedVariants={[{name: 'Color', value: 'Black'}]}
  quantity={1}
  isInStock={true}
  stockCount={8}
  onAddToCart={() => handleAddToCart()}
  onQuantityChange={(qty) => setQuantity(qty)}
/>
```

---

## 🔧 Customization

### Change Image Aspect Ratio
In `ProductCarousel.tsx`, change:
```tsx
className="aspect-[4/5]" // Change to aspect-square, aspect-[3/4], etc.
```

### Adjust Sticky Bar Trigger
In `StickyBuyBar.tsx`, change:
```tsx
setIsVisible(window.scrollY > 400); // Change 400 to your preferred scroll distance
```

### Customize Trust Badges
In `ProductDetails.tsx`, modify the trust badges section with your own text/icons.

---

## 📊 Analytics Events

Events are automatically sent to `window.dataLayer`:

- `product_image_view` - When user changes carousel image
- `product_variant_change` - When variant is selected
- `add_to_cart` - When product is added to cart
- `review_submitted` - When review is submitted

To use with Google Analytics 4:
```typescript
// In your analytics setup
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'add_to_cart',
  // ... event data
});
```

---

## ✅ Ready to Use!

All components are production-ready and follow best practices for:
- Performance (lazy loading, image optimization)
- Accessibility (ARIA, keyboard navigation)
- SEO (structured data, metadata)
- UX (smooth animations, responsive design)

