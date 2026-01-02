import { Metadata } from 'next';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Product' | 'BreadcrumbList' | 'AggregateRating' | 'Review';
  data: Record<string, any>;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://urbno.com';

  const getStructuredData = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'URBNO',
          url: baseUrl,
          logo: `${baseUrl}/logo.png`,
          description: 'Hand-sketched streetwear brand. Limited drops and studio collabs.',
          sameAs: [
            // Add your social media links here
            // 'https://www.instagram.com/urbno',
            // 'https://www.twitter.com/urbno',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Service',
            // email: 'support@urbno.com',
          },
          ...data,
        };

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'URBNO',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
          ...data,
        };

      case 'Product':
        return {
          '@context': 'https://schema.org',
          '@type': 'Product',
          ...data,
        };

      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.items,
        };

      case 'AggregateRating':
        return {
          '@context': 'https://schema.org',
          '@type': 'AggregateRating',
          ...data,
        };

      case 'Review':
        return {
          '@context': 'https://schema.org',
          '@type': 'Review',
          ...data,
        };

      default:
        return data;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getStructuredData()) }}
    />
  );
}

