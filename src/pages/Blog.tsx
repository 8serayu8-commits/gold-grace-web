import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import { Calendar, Clock, User, ChevronRight, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { breadcrumbSchema } from "@/utils/structuredData";
import NewsletterSignup from "@/components/NewsletterSignup";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
}

const Blog = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts: BlogPost[] = [
    {
      id: "pajak-penghasilan-2024",
      title: "Panduan Lengkap Pajak Penghasilan 2024: Perubahan Terbaru dan Tips Optimasi",
      excerpt: "Memahami perubahan tarif PPh terbaru, cara menghitung pajak dengan benar, dan strategi optimasi untuk individu dan bisnis.",
      content: `
        <h2>Pengenalan Pajak Penghasilan 2024</h2>
        <p>Pajak Penghasilan (PPh) merupakan salah satu jenis pajak yang paling signifikan dalam sistem perpajakan Indonesia. Tahun 2024 membawa beberapa perubahan penting yang perlu dipahami oleh wajib pajak.</p>
        
        <h3>Perubahan Tarif PPh 21 Terbaru</h3>
        <p>Tarif PPh 21 untuk tahun 2024 mengalami penyesuaian sebagai berikut:</p>
        <ul>
          <li>Penghasilan hingga Rp60 juta: 5%</li>
          <li>Penghasilan Rp60-250 juta: 15%</li>
          <li>Penghasilan Rp250-500 juta: 25%</li>
          <li>Penghasilan Rp500-5 miliar: 30%</li>
          <li>Penghasilan di atas Rp5 miliar: 35%</li>
        </ul>
        
        <h3>Tips Optimasi Pajak</h3>
        <p>Untuk mengoptimalkan pajak Anda, pertimbangkan strategi berikut:</p>
        <ol>
          <li>Manfaatkan semua deductible expenses</li>
          <li>Persiapkan dokumen dengan baik</li>
          <li>Gunakan fasilitas tax deduction yang tersedia</li>
          <li>Konsultasikan dengan profesional pajak</li>
        </ol>
      `,
      author: "Tim JADTRA Consulting",
      publishDate: "2024-04-01",
      readTime: "5 menit",
      category: "Pajak Penghasilan",
      tags: ["PPh 21", "Tarif Pajak", "Optimasi Pajak"],
      featured: true
    },
    {
      id: "pajak-umkm-digital",
      title: "Strategi Pajak untuk UMKM di Era Digital: Peluang dan Tantangan",
      excerpt: "Bagaimana UMKM dapat memanfaatkan fasilitas pajak dan mengatasi tantangan perpajakan dalam bisnis digital.",
      content: `
        <h2>UMKM Digital dan Perpajakan</h2>
        <p>Transformasi digital membawa peluang baru bagi UMKM, namun juga menciptakan tantangan perpajakan yang perlu dipahami.</p>
        
        <h3>Fasilitas Pajak untuk UMKM</h3>
        <p>Pemerintah menyediakan beberapa fasilitas pajak khusus untuk UMKM:</p>
        <ul>
          <li>PPh Final 0.5% untuk omzet hingga Rp4.8 miliar</li>
          <li>Pembebasan PPN untuk UMKM tertentu</li>
          <li>Insentif fiskal untuk sektor prioritas</li>
        </ul>
        
        <h3>Tantangan yang Dihadapi</h3>
        <p>UMKM digital menghadapi tantangan dalam:</p>
        <ol>
          <li>Pencatatan transaksi digital</li>
          <li>Kepatuhan perpajakan online</li>
          <li>Pemahaman regulasi e-commerce</li>
          <li>Integrasi sistem pembayaran</li>
        </ol>
      `,
      author: "Tim JADTRA Consulting",
      publishDate: "2024-03-28",
      readTime: "4 menit",
      category: "UMKM",
      tags: ["UMKM", "Digital", "Pajak Online"],
      featured: true
    },
    {
      id: "transfer-pricing-guide",
      title: "Transfer Pricing 101: Panduan Dasar untuk Transaksi Antar Perusahaan",
      excerpt: "Memahami konsep transfer pricing, aturan yang berlaku, dan cara mengimplementasikannya dalam bisnis multinasional.",
      content: `
        <h2>Apa itu Transfer Pricing?</h2>
        <p>Transfer pricing adalah penetapan harga untuk transaksi antar perusahaan dalam grup multinasional yang terkait. Tujuannya adalah untuk memastikan harga yang ditetapkan wajar dan sesuai dengan prinsip arm's length.</p>
        
        <h3>Metode Transfer Pricing</h3>
        <p>Terdapat beberapa metode yang dapat digunakan:</p>
        <ul>
          <li>Comparable Uncontrolled Price (CUP)</li>
          <li>Cost Plus Method</li>
          <li>Resale Price Method</li>
          <li>Profit Split Method</li>
          <li>Transactional Net Margin Method (TNMM)</li>
        </ul>
        
        <h3>Dokumentasi Transfer Pricing</h3>
        <p>Dokumentasi yang diperlukan meliputi:</p>
        <ol>
          <li>Master file</li>
          <li>Local file</li>
          <li>Country-by-country report</li>
          <li>Dokumentasi transaksi spesifik</li>
        </ol>
      `,
      author: "Tim JADTRA Consulting",
      publishDate: "2024-03-25",
      readTime: "6 menit",
      category: "Transfer Pricing",
      tags: ["Transfer Pricing", "Multinasional", "Dokumentasi"],
      featured: false
    },
    {
      id: "pajak-internasional",
      title: "Pajak Internasional: Panduan untuk Ekspansi Bisnis ke Luar Negeri",
      excerpt: "Memahami implikasi pajak internasional, tax treaty, dan strategi untuk bisnis yang ingin ekspansi global.",
      content: `
        <h2>Pengenalan Pajak Internasional</h2>
        <p>Ketika bisnis berekspansi ke luar negeri, perusahaan akan menghadapi kompleksitas pajak internasional yang perlu dipahami dengan baik.</p>
        
        <h3>Double Taxation Agreement (DTA)</h3>
        <p>Indonesia memiliki DTA dengan banyak negara untuk menghindari pengenaan pajak ganda. Manfaatkan DTA untuk:</p>
        <ul>
          <li>Mengurangi tarif pajak di negara sumber</li>
          <li>Menghindari pengenaan pajak ganda</li>
          <li>Meningkatkan kepastian hukum</li>
          <li>Mengurangi biaya pajak</li>
        </ul>
        
        <h3>Struktur Perpajakan Internasional</h3>
        <p>Pertimbangkan struktur berikut:</p>
        <ol>
          <li>Permanent Establishment (PE)</li>
          <li>Controlled Foreign Company (CFC)</li>
          <li>Treaty Shopping</li>
          <li>Thin Capitalization</li>
        </ol>
      `,
      author: "Tim JADTRA Consulting",
      publishDate: "2024-03-22",
      readTime: "7 menit",
      category: "Pajak Internasional",
      tags: ["Internasional", "DTA", "Ekspansi"],
      featured: false
    },
    {
      id: "tax-compliance-tips",
      title: "10 Tips Jitu untuk Kepatuhan Pajak yang Optimal",
      excerpt: "Praktik terbaik untuk memastikan kepatuhan pajak perusahaan dan menghindari potensi masalah dengan otoritas pajak.",
      content: `
        <h2>Importansi Kepatuhan Pajak</h2>
        <p>Kepatuhan pajak bukan hanya kewajiban hukum, tetapi juga investasi dalam keberlanjutan bisnis. Berikut 10 tips untuk memastikan kepatuhan optimal.</p>
        
        <h3>Tips Kepatuhan Pajak</h3>
        <ol>
          <li><strong>Maintain accurate records</strong> - Simpan semua dokumen dengan rapi</li>
          <li><strong>Understand deadlines</strong> - Catat semua tanggal jatuh tempo pembayaran</li>
          <li><strong>Use technology</strong> - Manfaatkan software akuntansi dan pajak</li>
          <li><strong>Regular reviews</strong> - Lakukan review berkala untuk identifikasi masalah</li>
          <li><strong>Professional consultation</strong> - Konsultasikan dengan ahli pajak</li>
          <li><strong>Stay updated</strong> - Ikuti perkembangan regulasi terbaru</li>
          <li><strong>Internal controls</strong> - Implementasikan sistem kontrol internal</li>
          <li><strong>Training staff</strong> - Latih tim tentang prosedur pajak</li>
          <li><strong>Document everything</strong> - Dokumentasikan semua keputusan pajak</li>
          <li><strong>Plan ahead</strong> - Buat perencanaan pajak jangka panjang</li>
        </ol>
        
        <h3>Common Mistakes to Avoid</h3>
        <p>Hindari kesalahan umum seperti:</p>
        <ul>
          <li>Terlambat pembayaran pajak</li>
          <li>Kesalahan perhitungan</li>
          <li>Dokumentasi tidak lengkap</li>
          <li>Tidak mengikuti update regulasi</li>
        </ul>
      `,
      author: "Tim JADTRA Consulting",
      publishDate: "2024-03-20",
      readTime: "5 menit",
      category: "Kepatuhan Pajak",
      tags: ["Compliance", "Best Practices", "Risk Management"],
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'JADTRA Consulting Blog',
    description: 'Tax insights, business consulting tips, and digital transformation strategies',
    url: 'https://jadtraweb.vercel.app/blog',
    publisher: {
      '@type': 'Organization',
      name: 'JADTRA Consulting',
      url: 'https://jadtraweb.vercel.app',
    },
    blogPost: blogPosts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      author: {
        '@type': 'Organization',
        name: post.author,
      },
      datePublished: post.publishDate,
      dateModified: post.publishDate,
      mainEntityOfPage: `https://jadtraweb.vercel.app/blog/${post.id}`,
    })),
  };

  const breadcrumbs = [
    { name: 'Home', url: 'https://jadtraweb.vercel.app' },
    { name: 'Blog', url: 'https://jadtraweb.vercel.app/blog' },
  ];

  return (
    <>
      <SEO 
        title="Blog - Tax Insights & Business Consulting Tips"
        description="Expert insights on Indonesian tax regulations, business consulting strategies, and digital transformation tips from JADTRA Consulting professionals."
        keywords="tax blog, Indonesian tax, business consulting, tax insights, digital transformation, tax tips"
        canonical="https://jadtraweb.vercel.app/blog"
        structuredData={structuredData}
      />
      <Layout>
        <section className="section-padding">
          <div className="container-narrow">
            <FadeIn>
              <Breadcrumb items={breadcrumbs} className="mb-6" />
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Blog</h1>
              <div className="gold-divider mt-4" />
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Wawasan mendalam tentang perpajakan Indonesia, konsultasi bisnis, dan transformasi digital dari para ahli JADTRA Consulting.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Search Section */}
        <section className="bg-secondary section-padding">
          <div className="container-narrow">
            <FadeIn>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="section-padding">
            <div className="container-narrow">
              <FadeIn>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">Artikel Pilihan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <article key={post.id} className="group cursor-pointer">
                      <Link to={`/blog/${post.id}`}>
                        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.publishDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            <Clock className="h-4 w-4 ml-2" />
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section className="section-padding">
          <div className="container-narrow">
            <FadeIn>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">Semua Artikel</h2>
              <div className="grid grid-cols-1 gap-6">
                {regularPosts.map((post) => (
                  <article key={post.id} className="group cursor-pointer">
                    <Link to={`/blog/${post.id}`}>
                      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-primary text-primary-foreground section-padding">
          <div className="container-narrow text-center">
            <FadeIn>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Dapatkan Update Terbaru
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Subscribe newsletter kami untuk mendapatkan insight pajak dan tips bisnis terbaru.
              </p>
              <NewsletterSignup />
            </FadeIn>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
