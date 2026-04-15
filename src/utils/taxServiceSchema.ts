// SEO Schema untuk Website Jasa Pajak
// Tax Consulting Service Structured Data

export interface TaxServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: Address;
  geo: Geo;
  openingHours: string[];
  priceRange: string;
  paymentAccepted: string[];
  currenciesAccepted: string[];
  hasOfferCatalog: OfferCatalog;
  areaServed: AreaServed;
  provider: Provider;
  serviceType: string[];
  category: string[];
  aggregateRating?: AggregateRating;
  review?: Review[];
}

export interface Address {
  '@type': string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface Geo {
  '@type': string;
  latitude: number;
  longitude: number;
}

export interface OfferCatalog {
  '@type': string;
  name: string;
  itemListElement: ServiceOffer[];
}

export interface ServiceOffer {
  '@type': string;
  itemOffered: {
    '@type': string;
    name: string;
    description: string;
    serviceType: string;
  };
  priceSpecification?: PriceSpecification;
  availability: string;
  validFrom: string;
}

export interface PriceSpecification {
  '@type': string;
  price: string;
  priceCurrency: string;
  priceRange?: string;
}

export interface AreaServed {
  '@type': string;
  name: string;
  addressCountry: string;
}

export interface Provider {
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs: string[];
  contactPoint: ContactPoint;
}

export interface ContactPoint {
  '@type': string;
  telephone: string;
  contactType: string;
  areaServed: string;
  availableLanguage: string[];
}

export interface AggregateRating {
  '@type': string;
  ratingValue: string;
  reviewCount: string;
  bestRating: string;
  worstRating: string;
}

export interface Review {
  '@type': string;
  author: {
    '@type': string;
    name: string;
  };
  reviewRating: {
    '@type': string;
    ratingValue: string;
  };
  reviewBody: string;
  datePublished: string;
}

// Generate Tax Service Schema
export const generateTaxServiceSchema = (): TaxServiceSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'JADTRA Consulting - Jasa Konsultasi Pajak',
    description: 'Konsultan pajak profesional di bawah KKP Hakim Muhamad dan Rekan. Menyediakan layanan konsultasi pajak, perencanaan pajak, kepatuhan pajak, dan solusi perpajakan untuk perusahaan dan individu di seluruh Indonesia.',
    url: 'https://jadtraconsulting.com',
    telephone: '+62 21 0000 0000',
    email: 'info@jadtraconsulting.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Sudirman No. 123',
      addressLocality: 'Jakarta',
      addressRegion: 'DKI Jakarta',
      postalCode: '12190',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2088,
      longitude: 106.8456
    },
    openingHours: [
      'Mo-Fr 09:00-17:00',
      'Sa 09:00-14:00'
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: ['IDR'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Konsultasi Pajak',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Konsultasi Pajak Perusahaan',
            description: 'Konsultasi komprehensif untuk kepatuhan pajak perusahaan, PPh Badan, PPN, dan pajak lainnya.',
            serviceType: 'Tax Consulting'
          },
          availability: 'https://schema.org/InStock',
          validFrom: '2024-01-01'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Konsultasi Pajak Pribadi',
            description: 'Layanan konsultasi pajak untuk individu, PPh 21, dan perencanaan pajak pribadi.',
            serviceType: 'Personal Tax Consulting'
          },
          availability: 'https://schema.org/InStock',
          validFrom: '2024-01-01'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Perencanaan Pajak',
            description: 'Strategi perencanaan pajak untuk optimasi beban pajak yang sah dan efisien.',
            serviceType: 'Tax Planning'
          },
          availability: 'https://schema.org/InStock',
          validFrom: '2024-01-01'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SPT Tahunan',
            description: 'Penyusunan dan pelaporan SPT tahunan untuk perusahaan dan individu.',
            serviceType: 'Tax Filing'
          },
          availability: 'https://schema.org/InStock',
          validFrom: '2024-01-01'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Pajak Internasional',
            description: 'Konsultasi pajak untuk transaksi internasional, PPh Pasal 26, dan tax treaty.',
            serviceType: 'International Tax'
          },
          availability: 'https://schema.org/InStock',
          validFrom: '2024-01-01'
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tax Due Diligence',
            description: 'Pemeriksaan komprehensif kepatuhan pajak dan identifikasi risiko perpajakan.',
            serviceType: 'Tax Due Diligence'
          },
          availability: 'https://schema.org/InStock',
          validFrom: '2024-01-01'
        }
      ]
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
      addressCountry: 'ID'
    },
    provider: {
      '@type': 'Organization',
      name: 'KKP Hakim Muhamad dan Rekan',
      url: 'https://jadtraconsulting.com',
      logo: 'https://jadtraconsulting.com/logo.png',
      description: 'Kantor Konsultan Pajak terdaftar yang berpengalaman dalam menyediakan layanan perpajakan profesional.',
      sameAs: [
        'https://www.linkedin.com/company/jadtra-consulting',
        'https://www.facebook.com/jadtraconsulting',
        'https://www.instagram.com/jadtraconsulting'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62 21 0000 0000',
        contactType: 'Customer Service',
        areaServed: 'Indonesia',
        availableLanguage: ['Indonesian', 'English']
      }
    },
    serviceType: [
      'Tax Consulting',
      'Tax Planning',
      'Tax Compliance',
      'Tax Filing',
      'International Tax',
      'Transfer Pricing',
      'Tax Due Diligence'
    ],
    category: [
      'Financial Services',
      'Professional Services',
      'Consulting',
      'Tax Services',
      'Business Services'
    ]
  };
};

// Financial Service Schema for additional SEO
export const generateFinancialServiceSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Layanan Keuangan dan Pajak JADTRA',
    description: 'Layanan konsultasi keuangan dan perpajakan untuk bisnis dan individu.',
    url: 'https://jadtraconsulting.com',
    provider: {
      '@type': 'Organization',
      name: 'KKP Hakim Muhamad dan Rekan',
      url: 'https://jadtraconsulting.com'
    },
    serviceType: [
      'Tax Advisory',
      'Financial Planning',
      'Business Consulting',
      'Compliance Services'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Keuangan',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Konsultasi Pajak',
            description: 'Layanan konsultasi pajak profesional'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Perencanaan Keuangan',
            description: 'Perencanaan keuangan untuk bisnis'
          }
        }
      ]
    }
  };
};

// Local Business Schema
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'JADTRA Consulting',
    description: 'Konsultan pajak profesional di Jakarta',
    url: 'https://jadtraconsulting.com',
    telephone: '+62 21 0000 0000',
    email: 'info@jadtraconsulting.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Sudirman No. 123',
      addressLocality: 'Jakarta',
      addressRegion: 'DKI Jakarta',
      postalCode: '12190',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.2088,
      longitude: 106.8456
    },
    openingHours: [
      'Mo-Fr 09:00-17:00',
      'Sa 09:00-14:00'
    ],
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: ['IDR'],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: -6.2088,
        longitude: 106.8456
      },
      geoRadius: '50000'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Konsultasi Pajak',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Konsultasi Pajak',
            description: 'Layanan konsultasi pajak profesional'
          }
        }
      ]
    }
  };
};

// Article Schema for Tax Blog Posts
export const generateArticleSchema = (articleData: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData.title,
    description: articleData.description,
    image: articleData.imageUrl || 'https://jadtraconsulting.com/default-article-image.jpg',
    author: {
      '@type': 'Person',
      name: articleData.author,
      url: 'https://jadtraconsulting.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'JADTRA Consulting',
      logo: {
        '@type': 'ImageObject',
        url: 'https://jadtraconsulting.com/logo.png'
      }
    },
    datePublished: articleData.datePublished,
    dateModified: articleData.dateModified || articleData.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleData.url
    },
    articleSection: articleData.category || 'Tax Consulting',
    keywords: articleData.tags?.join(', ') || 'pajak, konsultasi pajak, perpajakan indonesia',
    wordCount: 800,
    about: [
      {
        '@type': 'Thing',
        name: 'Pajak Indonesia'
      },
      {
        '@type': 'Thing',
        name: 'Konsultasi Pajak'
      }
    ]
  };
};

// FAQ Schema for Tax Questions
export const generateFAQSchema = (faqs: Array<{
  question: string;
  answer: string;
}>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
};

// HowTo Schema for Tax Guides
export const generateHowToSchema = (howToData: {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
}) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howToData.name,
    description: howToData.description,
    totalTime: howToData.totalTime || 'PT60M',
    estimatedCost: howToData.estimatedCost,
    tool: [
      {
        '@type': 'Thing',
        name: 'Kalkulator Pajak'
      },
      {
        '@type': 'Thing',
        name: 'Formulir Pajak'
      }
    ],
    step: howToData.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      tool: [
        {
          '@type': 'Thing',
          name: 'Dokumen Pajak'
        }
      ]
    }))
  };
};

export default {
  generateTaxServiceSchema,
  generateFinancialServiceSchema,
  generateLocalBusinessSchema,
  generateArticleSchema,
  generateFAQSchema,
  generateHowToSchema
};
