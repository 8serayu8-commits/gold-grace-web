// Automatic Article Structure Generator from Official Tax Sources
// Generate structured articles from Indonesian tax regulations

export interface TaxArticleSource {
  id: string;
  title: string;
  source: string;
  url: string;
  category: string;
  lastUpdated: string;
  content: string;
  tags: string[];
}

export interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  structuredData: any;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

// Official Indonesian Tax Sources
const OFFICIAL_TAX_SOURCES = [
  {
    name: 'Direktorat Jenderal Pajak',
    url: 'https://www.pajak.go.id',
    category: 'Regulations',
    lastChecked: '2025-04-14'
  },
  {
    name: 'Peraturan Pajak',
    url: 'https://peraturan.pajak.go.id',
    category: 'Regulations',
    lastChecked: '2025-04-14'
  },
  {
    name: 'Kemenkeu - Pajak',
    url: 'https://www.kemenkeu.go.id/pajak',
    category: 'Policy',
    lastChecked: '2025-04-14'
  }
];

// Tax Article Templates
const ARTICLE_TEMPLATES = {
  PPH_21: {
    title: 'Panduan Lengkap PPh 21 {year}: Cara Hitung, Bayar, dan Lapor',
    sections: [
      'Pengertian PPh 21',
      'Subjek Pajak PPh 21',
      'Cara Perhitungan PPh 21',
      'Tarif PPh 21 Terbaru',
      'Cara Pembayaran PPh 21',
      'Pelaporan SPT PPh 21',
      'Tips dan Trik PPh 21'
    ],
    keywords: ['PPh 21', 'pajak penghasilan', 'SPT 1770', 'tarif pajak'],
    readingTime: 8
  },
  PPN: {
    title: 'Panduan PPN {year}: Aturan, Tarif, dan Pelaporan',
    sections: [
      'Pengertian PPN',
      'Objek Pajak PPN',
      'Tarif PPN Terbaru',
      'Faktur Pajak',
      'Pelaporan PPN',
      'Pemungutan PPN',
      'Tips PPN untuk Bisnis'
    ],
    keywords: ['PPN', 'pajak pertambahan nilai', 'faktur pajak', 'SPT 1111'],
    readingTime: 10
  },
  PAJAK_BADAN: {
    title: 'Panduan Pajak Badan {year}: Lengkap untuk Perusahaan',
    sections: [
      'Pengertian Pajak Badan',
      'Kriteria Wajib Pajak Badan',
      'Perhitungan PPh Badan',
      'Tarif PPh Badan',
      'Pajak Penghasilan Tidak Teratur',
      'Pelaporan SPT 1771',
      'Tips Optimasi Pajak Badan'
    ],
    keywords: ['Pajak Badan', 'PPh Badan', 'SPT 1771', 'pajak perusahaan'],
    readingTime: 12
  },
  PAJAK_KENDARAAN: {
    title: 'Panduan Pajak Kendaraan {year}: Mobil dan Motor',
    sections: [
      'Jenis Pajak Kendaraan',
      'Cara Hitung PKB',
      'Tarif Pajak Kendaraan',
      'Pembayaran Pajak Kendaraan',
      'Balik Nama Kendaraan',
      'Tips Hemat Pajak Kendaraan'
    ],
    keywords: ['Pajak Kendaraan', 'PKB', 'pajak mobil', 'pajak motor'],
    readingTime: 6
  }
};

// Generate article based on template and year
export const generateTaxArticle = (
  template: keyof typeof ARTICLE_TEMPLATES,
  year: number = new Date().getFullYear(),
  customData?: Partial<TaxArticleSource>
): GeneratedArticle => {
  const templateData = ARTICLE_TEMPLATES[template];
  const currentYear = year.toString();
  
  // Generate title
  const title = templateData.title.replace('{year}', currentYear);
  
  // Generate slug
  const slug = title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 100);
  
  // Generate excerpt
  const excerpt = `Panduan lengkap dan terupdate ${templateData.keywords.join(', ')} tahun ${currentYear}. Pelajari cara perhitungan, pembayaran, dan pelaporan yang benar sesuai aturan terbaru dari Direktorat Jenderal Pajak.`;
  
  // Generate content
  const content = generateArticleContent(templateData, currentYear, customData);
  
  // Calculate reading time
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed
  
  // Generate structured data
  const structuredData = generateArticleStructuredData(title, excerpt, slug);
  
  return {
    title,
    slug,
    excerpt,
    content,
    category: 'Pajak',
    tags: templateData.keywords,
    author: 'Tim JADTRA Consulting',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readingTime,
    structuredData,
    seo: {
      metaTitle: title,
      metaDescription: excerpt,
      keywords: templateData.keywords
    }
  };
};

// Generate article content sections
const generateArticleContent = (
  template: any,
  year: string,
  customData?: Partial<TaxArticleSource>
): string => {
  const sections = template.sections.map((section: string, index: number) => {
    return generateSectionContent(section, year, index === 0);
  });
  
  const disclaimer = `
---
## **Disclaimer**

Artikel ini disusun berdasarkan peraturan perpajakan yang berlaku hingga ${new Date().toLocaleDateString('id-ID')}. 
Untuk informasi yang lebih spesifik sesuai kondisi perusahaan atau pribadi Anda, 
konsultasikan dengan konsultan pajak profesional di **JADTRA Consulting**.

### **Butuh Bantuan Pajak?**

Hubungi tim konsultan pajak profesional kami untuk:
- Konsultasi pajak perusahaan dan pribadi
- Penyusunan SPT tahunan
- Perencanaan pajak optimal
- Tax due diligence
- Konsultasi pajak internasional

**Kontak JADTRA Consulting:**
- WhatsApp: +62 812-3456-7890
- Email: info@jadtraconsulting.com
- Website: jadtraconsulting.com

*Diperbarui: ${new Date().toLocaleDateString('id-ID')}*
  `;
  
  return sections.join('\n\n') + disclaimer;
};

// Generate individual section content
const generateSectionContent = (sectionTitle: string, year: string, isFirst: boolean): string => {
  const sectionContent: Record<string, string> = {
    'Pengertian PPh 21': `
## **${sectionTitle}**

PPh 21 (Pajak Penghasilan Pasal 21) adalah pajak yang dipungut atas penghasilan yang diterima oleh:
- Wajib Pajak dalam negeri (orang pribadi)
- Wajib Pajak luar negeri yang bekerja di Indonesia
- Bentuk usaha tetap (BUT) di Indonesia

**Dasar Hukum:**
- UU No. 7 Tahun 2021 tentang Harmonisasi Peraturan Perpajakan
- Peraturan Pemerintah No. 68 Tahun 2022 tentang Tata Cara Perhitungan dan Pembayaran PPh 21

**Penghasilan yang dikenakan PPh 21:**
1. Gaji, upah, honorarium, tunjangan
2. Imbalan sehubungan dengan pekerjaan atau jasa
3. Penghasilan dari kegiatan bekerja
4. Penghasilan dari pensiun atau imbalan lain
    `,
    
    'Subjek Pajak PPh 21': `
## **${sectionTitle}**

Subjek pajak PPh 21 dibedakan menjadi:

### **1. Wajib Pajak Dalam Negeri**
- Warga Negara Indonesia (WNI)
- Orang pribadi yang menetap di Indonesia (>183 hari dalam 12 bulan)
- Bentuk usaha tetap di Indonesia
- Warisan yang belum terbagi

### **2. Wajib Pajak Luar Negeri**
- Warga Negara Asing (WNA) yang bekerja di Indonesia
- Orang pribadi yang tidak menetap di Indonesia
- Bentuk usaha tetap luar negeri

### **3. Subjek Pajak Terpilih**
- Perwakilan negara asing
- Organisasi internasional
- pekerja mereka yang bukan WNI

**Status Pajak:**
- **TK (Tidak Kawin)**: Belum menikah
- **K (Kawin)**: Sudah menikah
- **K/I (Kawin Anak)**: Menikah dengan anak
- **K/II, K/III**: Menikah dengan 2 atau 3 anak tanggungan
    `,
    
    'Cara Perhitungan PPh 21': `
## **${sectionTitle}**

### **Langkah 1: Hitung Penghasilan Bruto**
\`\`\`
Gaji Pokok + Tunjangan + Lembur + Bonus = Penghasilan Bruto
\`\`\`

### **Langkah 2: Kurangi Penghasilan Tidak Kena Pajak (PTKP)**
**PTKP Tahun ${year}:**
- TK: Rp 54.000.000
- K: Rp 58.500.000  
- K/1: Rp 63.000.000
- K/2: Rp 67.500.000
- K/3: Rp 72.000.000

### **Langkah 3: Hitung Penghasilan Kena Pajak (PKP)**
\`\`\`
Penghasilan Bruto - PTKP = PKP
\`\`\`

### **Langkah 4: Terapkan Tarif PPh 21**
**Tarif PPh 21 Tahun ${year}:**
- Sampai Rp 60.000.000: 5%
- Di atas Rp 60.000.000 - 250.000.000: 15%
- Di atas Rp 250.000.000 - 500.000.000: 25%
- Di atas Rp 500.000.000 - 5.000.000.000: 30%
- Di atas Rp 5.000.000.000: 35%

### **Contoh Perhitungan:**
\`\`\`
Gaji bulanan: Rp 10.000.000
Gaji tahunan: Rp 120.000.000
PTKP (TK): Rp 54.000.000
PKP: Rp 66.000.000

PPh 21 Tahunan:
- Rp 60.000.000 × 5% = Rp 3.000.000
- Rp 6.000.000 × 15% = Rp 900.000
Total PPh 21: Rp 3.900.000
\`\`\`
    `,
    
    'default': `
## **${sectionTitle}**

Informasi terkait ${sectionTitle} tahun ${year} akan segera diperbarui sesuai dengan peraturan terbaru dari Direktorat Jenderal Pajak.

Untuk informasi yang lebih lengkap dan akurat, silakan:
1. Kunjungi website resmi pajak.go.id
2. Konsultasikan dengan konsultan pajak profesional
3. Hubungi JADTRA Consulting untuk bantuan perpajakan

**Update Terbaru:**
- Peraturan terbaru akan diupdate sesuai kebijakan pemerintah
- Tarif dan aturan dapat berubah sewaktu-waktu
- Selalu periksa regulasi terbaru sebelum mengambil keputusan perpajakan
    `
  };
  
  return sectionContent[sectionTitle] || sectionContent['default'];
};

// Generate structured data for article
const generateArticleStructuredData = (title: string, excerpt: string, slug: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: excerpt,
    image: 'https://jadtraconsulting.com/images/tax-article.jpg',
    author: {
      '@type': 'Organization',
      name: 'JADTRA Consulting',
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
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://jadtraconsulting.com/blog/${slug}`
    },
    articleSection: 'Tax Consulting',
    keywords: 'pajak, konsultasi pajak, perpajakan indonesia, SPT, tax consulting',
    wordCount: 1500,
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

// Generate multiple articles for current year
export const generateAllTaxArticles = (year: number = new Date().getFullYear()): GeneratedArticle[] => {
  const templates = Object.keys(ARTICLE_TEMPLATES) as (keyof typeof ARTICLE_TEMPLATES)[];
  
  return templates.map(template => generateTaxArticle(template, year));
};

// Auto-update articles with latest tax regulations
export const updateArticlesWithLatestRegulations = async (): Promise<TaxArticleSource[]> => {
  // Simulate fetching from official sources
  const latestRegulations: TaxArticleSource[] = [
    {
      id: 'pph-21-2025',
      title: 'Perubahan Tarif PPh 21 Tahun 2025',
      source: 'Direktorat Jenderal Pajak',
      url: 'https://www.pajak.go.id/pph-21-2025',
      category: 'Regulations',
      lastUpdated: '2025-01-01',
      content: 'Perubahan tarif PPh 21 tahun 2025...',
      tags: ['PPh 21', 'tarif', 'regulasi']
    },
    {
      id: 'ppn-2025',
      title: 'Aturan Baru PPN Tahun 2025',
      source: 'Direktorat Jenderal Pajak',
      url: 'https://www.pajak.go.id/ppn-2025',
      category: 'Regulations',
      lastUpdated: '2025-01-15',
      content: 'Aturan baru PPN tahun 2025...',
      tags: ['PPN', 'regulasi', 'tarif']
    }
  ];
  
  return latestRegulations;
};

// Article scheduling and publishing
export const scheduleArticlePublishing = (articles: GeneratedArticle[]) => {
  return {
    totalArticles: articles.length,
    publishingSchedule: articles.map((article, index) => ({
      article: article.slug,
      publishDate: new Date(Date.now() + (index * 7 * 24 * 60 * 60 * 1000)), // Weekly
      status: 'scheduled',
      priority: index === 0 ? 'high' : 'normal'
    })),
    nextPublishDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };
};

export default {
  generateTaxArticle,
  generateAllTaxArticles,
  updateArticlesWithLatestRegulations,
  scheduleArticlePublishing,
  OFFICIAL_TAX_SOURCES,
  ARTICLE_TEMPLATES
};
