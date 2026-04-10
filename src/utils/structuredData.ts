// Structured Data (Schema.org) utilities for SEO

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'JADTRA Consulting',
  alternateName: 'KKP Hakim Muhamad dan Rekan',
  url: 'https://jadtraconsulting.com',
  logo: 'https://jadtraconsulting.com/logo.png',
  description: 'Professional business consulting, tax advisory, and digital transformation services',
  foundingDate: '2010',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jakarta',
    addressRegion: 'JK',
    addressCountry: 'ID',
    postalCode: '10000',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-21-0000-0000',
    contactType: 'customer service',
    availableLanguage: ['English', 'Indonesian'],
    email: 'info@jadtraconsulting.com',
  },
  sameAs: [
    'https://www.linkedin.com/company/jadtra-consulting',
    'https://twitter.com/jadtraconsulting',
    'https://www.facebook.com/jadtraconsulting',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'Indonesia',
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'JADTRA Consulting',
  description: 'Professional business consulting, tax advisory, and digital transformation services under KKP Hakim Muhamad dan Rekan',
  url: 'https://jadtraconsulting.com',
  telephone: '+62-21-0000-0000',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Jakarta',
    addressRegion: 'JK',
    addressCountry: 'ID',
    postalCode: '10000',
    streetAddress: 'Jakarta, Indonesia',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -6.2088,
    longitude: 106.8456,
  },
  openingHours: 'Mo-Fr 09:00-17:00',
  priceRange: '$$',
  paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
  currenciesAccepted: 'IDR',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Professional Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Business Consulting',
          description: 'Strategic guidance for sustainable business growth and operational excellence',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Tax & Accounting Advisory',
          description: 'Expert tax planning, compliance, and financial advisory services',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Digital Transformation',
          description: 'Modernize your business with cutting-edge digital solutions and processes',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'System Development Planning',
          description: 'Comprehensive planning for scalable and efficient system architectures',
        },
      },
    ],
  },
};

export const serviceSchema = (serviceName: string, serviceDescription: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: serviceDescription,
  provider: {
    '@type': 'Organization',
    name: 'JADTRA Consulting',
    url: 'https://jadtraconsulting.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Indonesia',
  },
});

export const articleSchema = (title: string, description: string, publishDate: string, author: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  image: 'https://jadtraconsulting.com/og-image.jpg',
  datePublished: publishDate,
  dateModified: publishDate,
  author: {
    '@type': 'Person',
    name: author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'JADTRA Consulting',
    logo: {
      '@type': 'ImageObject',
      url: 'https://jadtraconsulting.com/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://jadtraconsulting.com/article/${title.toLowerCase().replace(/\s+/g, '-')}`,
  },
});

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'JADTRA Consulting',
  url: 'https://jadtraconsulting.com',
  description: 'Professional business consulting, tax advisory, and digital transformation services',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://jadtraconsulting.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
  publisher: {
    '@type': 'Organization',
    name: 'JADTRA Consulting',
    url: 'https://jadtraconsulting.com',
  },
};

export const breadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const reviewSchema = (reviews: Array<{ author: string; reviewRating: number; reviewBody: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'JADTRA Consulting',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: reviews.reduce((acc, review) => acc + review.reviewRating, 0) / reviews.length,
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  },
  review: reviews.map(review => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.reviewRating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: review.reviewBody,
  })),
});
