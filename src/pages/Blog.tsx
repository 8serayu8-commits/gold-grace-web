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
      id: "pajak-penghasilan-2026",
      title: "Panduan Lengkap PPh 21 Tahun 2026: Tarif Baru dan Strategi Optimasi",
      excerpt: "Memahami perubahan tarif PPh 21 terbaru 2026, cara perhitungan yang akurat, dan strategi optimasi pajak untuk maksimalkan penghasilan bersih Anda.",
      content: `
        <h2>Pajak Penghasilan 2026: Apa yang Berubah?</h2>
        <p>Tahun 2026 membawa perubahan signifikan dalam peraturan PPh 21 Indonesia. UU Harmonisasi Peraturan Perpajakan (UU HPP) terus berdampak pada cara kita menghitung dan membayar pajak penghasilan.</p>
        
        <h3>Update Tarif PPh 21 2026</h3>
        <p>Berikut tarif PPh 21 yang berlaku tahun 2026:</p>
        <ul>
          <li>Penghasilan hingga Rp60 juta: 5%</li>
          <li>Penghasilan Rp60-250 juta: 15%</li>
          <li>Penghasilan Rp250-500 juta: 25%</li>
          <li>Penghasilan Rp500-5 miliar: 30%</li>
          <li>Penghasilan di atas Rp5 miliar: 35%</li>
        </ul>
        
        <h3>PTKP Terbaru 2026</h3>
        <p>Penghasilan Tidak Kena Pajak (PTKP) tahun 2026:</p>
        <ul>
          <li>TK (Tidak Kawin): Rp54.000.000</li>
          <li>K (Kawin): Rp58.500.000</li>
          <li>K/I (Kawin Anak 1): Rp63.000.000</li>
          <li>K/II (Kawin Anak 2): Rp67.500.000</li>
          <li>K/III (Kawin Anak 3): Rp72.000.000</li>
        </ul>
        
        <h3>Strategi Optimasi Pajak 2026</h3>
        <ol>
          <li><strong>Manfaatkan deductible expenses</strong> - Biaya operasional, biaya transport, dan biaya representasi</li>
          <li><strong>Optimalkan fasilitas pensiun</strong> - Kontribusi dana pensiun dapat mengurangi penghasilan kena pajak</li>
          <li><strong>Investasi yang tax-efficient</strong> - Saham, obligasi, dan produk investasi lain yang mendapat fasilitas pajak</li>
          <li><strong>Dokumentasi yang lengkap</strong> - Simpan semua bukti pengeluaran yang dapat dikurangkan</li>
        </ol>
        
        <h3>Tips Praktis untuk Karyawan</h3>
        <ul>
          <li>Periksa slip gaji setiap bulan untuk memastikan perhitungan pajak benar</li>
          <li>Simpan semua bukti pengeluaran yang relevan</li>
          <li>Gunakan aplikasi penghitung pajak yang terpercaya</li>
          <li>Konsultasikan dengan konsultan pajak untuk situasi kompleks</li>
        </ul>
      `,
      author: "Tim JADTRA Consulting",
      publishDate: "2026-01-15",
      readTime: "8 menit",
      category: "Pajak Penghasilan",
      tags: ["PPh 21", "Tarif Pajak 2026", "Optimasi Pajak", "PTKP"],
      featured: true
    },
    {
      id: "umkm-digital-2026",
      title: "UMKM Digital 2026: Panduan Lengkap Pajak E-Commerce",
      excerpt: "Strategi lengkap perpajakan untuk UMKM digital, tips optimasi pajak online, dan cara memanfaatkan fasilitas pajak terbaru 2026.",
      content: `
        <h2>Era Digital UMKM 2026: Peluang dan Tantangan Pajak</h2>
        <p>Tahun 2026 menandai era baru bagi UMKM Indonesia dengan pertumbuhan e-commerce yang pesat. Namun, kesuksesan digital harus diimbangi dengan kepatuhan perpajakan yang tepat.</p>
        
        <h3>Fasilitas Pajak UMKM Terbaru 2026</h3>
        <p>Pemerintah terus memberikan dukungan melalui fasilitas pajak:</p>
        <ul>
          <li><strong>PPh Final 0.5%</strong> - Untuk omzet hingga Rp4.8 miliar per tahun</li>
          <li><strong>Pembebasan PPN</strong> - Untuk barang/jasa tertentu yang diekspor</li>
          <li><strong>Tax Holiday</strong> - Untuk investasi di sektor prioritas</li>
          <li><strong>Super Tax Deduction</strong> - Deduksi hingga 300% untuk investasi vokasi</li>
        </ul>
        
        <h3>Platform E-Commerce dan Kewajiban Pajak</h3>
        <p>Setiap platform memiliki karakteristik pajak yang berbeda:</p>
        <ol>
          <li><strong>Marketplace (Tokopedia, Shopee, dll)</strong> - PPh 22 dipungut oleh platform</li>
          <li><strong>Social Commerce (Instagram, TikTok)</strong> - Self-assessment oleh penjual</li>
          <li><strong>Website Sendiri</strong> - Full compliance oleh pemilik bisnis</li>
          <li><strong>Dropshipping</strong> - Perhatikan nexus pajak di berbagai lokasi</li>
        </ol>
        
        <h3>Strategi Optimasi Pajak UMKM Digital</h3>
        <ul>
          <li><strong>Separate business finances</strong> - Pisahkan keuangan pribadi dan bisnis</li>
          <li><strong>Use accounting software</strong> - Otomatisasi pencatatan dan pelaporan</li>
          <li><strong>Understand tax nexus</strong> - Kewajiban pajak di berbagai jurisdiksi</li>
          <li><strong>Document everything</strong> - Simpan semua bukti transaksi digital</li>
          <li><strong>Regular tax health check</strong> - Review berkala dengan konsultan pajak</li>
        </ul>
        
        <h3>Tips Praktis untuk UMKM Digital</h3>
        <ol>
          <li>Daftarkan NPWP segera setelah memulai bisnis</li>
          <li>Pilih bentuk usaha yang tepat (perorangan vs PT)</li>
          <li>Manfaatkan aplikasi pembukuan digital</li>
          <li>Ikuti update regulasi e-commerce</li>
          <li>Bangun sistem kepatuhan dari awal</li>
        </ol>
      `,
      author: "Tim JADTRA Consulting",
      publishDate: "2026-01-20",
      readTime: "10 menit",
      category: "UMKM Digital",
      tags: ["UMKM", "E-Commerce", "Pajak Digital", "Startup"],
      featured: true
    },
    {
      id: "tax-compliance-2026",
      title: "Digital Tax Compliance 2026: Panduan Kepatuhan Pajak Era Digital",
      excerpt: "Strategi modern untuk kepatuhan pajak digital, implementasi teknologi, dan best practices untuk bisnis era 2026.",
      content: `
        <h2>Era Kepatuhan Pajak Digital 2026</h2>
        <p>Tahun 2026 menandai transformasi lengkap kepatuhan pajak ke era digital. DJP terus berinovasi dengan teknologi untuk meningkatkan kepatuhan dan memudahkan wajib pajak.</p>
        
        <h3>Inovasi Digital DJP 2026</h3>
        <ul>
          <li><strong>e-Filing Enhanced</strong> - Interface lebih user-friendly dengan AI assistant</li>
          <li><strong>e-Billing Real-time</strong> - Notifikasi pembayaran pajak instan</li>
          <li><strong>Digital Tax Audit</strong> - Audit berbasis data analytics</li>
          <li><strong>Blockchain Integration</strong> - Keamanan dan transparansi data pajak</li>
        </ul>
        
        <h3>Strategi Kepatuhan Modern</h3>
        <ol>
          <li><strong>Cloud-based Tax Management</strong> - Sistem pajak terintegrasi di cloud</li>
          <li><strong>Automated Compliance</strong> - Otomasi pelaporan dan pembayaran</li>
          <li><strong>Real-time Monitoring</strong> - Dashboard kepatuhan real-time</li>
          <li><strong>Predictive Analytics</strong> - Prediksi risiko pajak dengan AI</li>
        </ol>
        
        <h3>Best Practices untuk 2026</h3>
        <ul>
          <li>Implementasikan sistem ERP terintegrasi dengan modul pajak</li>
          <li>Gunakan software kepatuhan pajak yang certified</li>
          <li>Bangun tim digital tax specialist</li>
          <li>Lakukan digital tax assessment berkala</li>
          <li>Manfaatkan fasilitas pajak digital yang tersedia</li>
        </ul>
        
        <h3>Risiko dan Mitigasi</h3>
        <ol>
          <li><strong>Data Security</strong> - Enkripsi data pajak sensitif</li>
          <li><strong>System Integration</strong> - Kompatibilitas antar sistem</li>
          <li><strong>Regulatory Changes</strong> - Update regulasi digital pajak</li>
          <li><strong>Cybersecurity</strong> - Proteksi sistem kepatuhan dari cyber threats</li>
        </ol>
      `,
      author: "Tim JADTRA Consulting",
      publishDate: "2026-01-18",
      readTime: "12 menit",
      category: "Tax Technology",
      tags: ["Digital Tax", "Compliance", "Tax Technology", "Innovation"],
      featured: true
    },
    {
      id: "esg-tax-2026",
      title: "ESG dan Pajak 2026: Peluang Investasi Berkelanjutan",
      excerpt: "Bagaimana ESG (Environmental, Social, Governance) memengaruhi strategi pajak dan peluang insentif fiskal untuk investasi berkelanjutan.",
      content: `
        <h2>ESG Meets Tax: Paradigma Baru 2026</h2>
        <p>Tahun 2026 melihat konvergensi antara ESG dan perpajakan. Pemerintah Indonesia semakin agresif memberikan insentif pajak untuk investasi berkelanjutan.</p>
        
        <h3>Insentif Pajak ESG Terbaru</h3>
        <ul>
          <li><strong>Green Tax Incentives</strong> - Deduksi pajak untuk investasi hijau</li>
          <li><strong>Carbon Tax Credits</strong> - Kredit pajak untuk reduksi emisi</li>
          <li><strong>Social Investment Deduction</strong> - Fasilitas untuk program sosial</li>
          <li><strong>Sustainability Reporting Tax Benefits</strong> - Insentif untuk laporan ESG</li>
        </ul>
        
        <h3>Sektor Prioritas ESG 2026</h3>
        <ol>
          <li><strong>Energi Terbarukan</strong> - Solar, wind, dan renewable energy</li>
          <li><strong>Transportasi Hijau</strong> - EV dan infrastruktur charging</li>
          <li><strong>Waste Management</strong> - Pengelolaan sampah berkelanjutan</li>
          <li><strong>Green Building</strong> - Bangunan sertifikasi hijau</li>
        </ol>
        
        <h3>Strategi Tax Planning ESG</h3>
        <ul>
          <li>Integrasikan ESG dalam corporate tax strategy</li>
          <li>Manfaatkan super tax deduction untuk investasi vokasi</li>
          <li>Optimalkan carbon credits dan green certificates</li>
          <li>Bangun ESG reporting framework terintegrasi pajak</li>
          <li>Kolaborasi dengan ESG consultants dan tax advisors</li>
        </ul>
        
        <h3>Case Study: Success Stories</h3>
        <p>Beberapa perusahaan telah berhasil memanfaatkan insentif ESG:</p>
        <ol>
          <li>Manufacturing company menghemat 30% pajak melalui green investment</li>
          <li>Tech startup mendapatkan tax holiday untuk ESG innovation</li>
          <li>Property developer benefit dari green building incentives</li>
        </ol>
      `,
      author: "Tim JADTRA Consulting",
      publishDate: "2026-01-22",
      readTime: "15 menit",
      category: "ESG & Tax",
      tags: ["ESG", "Sustainability", "Green Tax", "Investment"],
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
        title="Blog 2026 - Tax Insights & Digital Business Consulting"
        description="Latest 2026 tax insights, digital business strategies, ESG tax benefits, and modern compliance tips from JADTRA Consulting experts."
        keywords="tax blog 2026, Indonesian tax, digital transformation, ESG tax, business consulting, tax compliance"
        canonical="https://jadtraweb.vercel.app/blog"
        structuredData={structuredData}
      />
      <Layout>
        {/* Hero Section */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="container-narrow relative">
            <FadeIn>
              <Breadcrumb items={breadcrumbs} className="mb-6" />
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Blog JADTRA Consulting
                </h1>
                <div className="gold-divider mx-auto mb-8" />
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Wawasan pajak terbaru 2026, strategi bisnis digital, dan tips kepatuhan modern dari para ahli konsultan pajak kami.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    2026 Updates
                  </span>
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    Digital Tax
                  </span>
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    ESG Insights
                  </span>
                </div>
              </div>
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
