import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import PPh21Calculator from "@/components/PPh21Calculator";
import { Calculator } from "lucide-react";
import { articleSchema, breadcrumbSchema } from "@/utils/structuredData";

const TaxCalculator = () => {
  const breadcrumbs = [
    { name: 'Home', url: 'https://jadtraweb.vercel.app' },
    { name: 'Tax Calculator', url: 'https://jadtraweb.vercel.app/tax-calculator' },
  ];

  const structuredData = articleSchema(
    "Kalkulator PPh 21 Online",
    "Hitung PPh 21 pegawai tetap dengan kalkulator online gratis dari JADTRA Consulting. Mudah digunakan, akurat, dan sesuai regulasi terbaru.",
    "2024-04-10",
    "Tim JADTRA Consulting"
  );

  return (
    <>
      <SEO 
        title="Kalkulator PPh 21 Online - Gratis & Akurat"
        description="Hitung PPh 21 pegawai tetap dengan kalkulator online gratis dari JADTRA Consulting. Mudah digunakan, akurat, dan sesuai regulasi pajak terbaru."
        keywords="kalkulator PPh 21, hitung PPh 21, PPh 21 online, kalkulator pajak, pajak penghasilan, tax calculator Indonesia"
        canonical="https://jadtraweb.vercel.app/tax-calculator"
        structuredData={structuredData}
      />
      <Layout>
        <section className="section-padding">
          <div className="container-narrow">
            <FadeIn>
              <Breadcrumb items={breadcrumbs} className="mb-6" />
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="h-8 w-8 text-primary" />
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
                  Kalkulator PPh 21
                </h1>
              </div>
              <div className="gold-divider mt-4" />
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Kalkulator online gratis untuk menghitung PPh 21 pegawai tetap sesuai regulasi perpajakan Indonesia terbaru.
                Mudah digunakan, akurat, dan transparan.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="bg-secondary section-padding">
          <div className="container-narrow">
            <FadeIn>
              <PPh21Calculator />
            </FadeIn>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow">
            <FadeIn>
              <div className="prose prose-lg max-w-none text-foreground">
                <h2>Tentang Kalkulator PPh 21</h2>
                <p>
                  Kalkulator PPh 21 dari JADTRA Consulting dirancang untuk membantu Anda menghitung estimasi PPh 21 yang harus dibayar oleh pegawai tetap. 
                  Perhitungan didasarkan pada peraturan perpajakan Indonesia yang berlaku.
                </p>
                
                <h3>Fitur Kalkulator</h3>
                <ul>
                  <li>Perhitungan PPh 21 untuk pegawai tetap</li>
                  <li>Mendukung berbagai status PTKP (TK, K, KI dengan tanggungan 0-3)</li>
                  <li>Hasil perhitungan tahunan dan bulanan</li>
                  <li>Tarif efektif pajak</li>
                  <li>Penghasilan kena pajak dan penghasilan bersih</li>
                </ul>
                
                <h3>Cara Menggunakan</h3>
                <ol>
                  <li>Masukkan penghasilan bruto per bulan</li>
                  <li>Pilih status PTKP yang sesuai</li>
                  <li>Klik tombol "Hitung Pajak"</li>
                  <li>Lihat hasil perhitungan lengkap</li>
                </ol>
                
                <h3>Disclaimer</h3>
                <p>
                  Kalkulator ini hanya untuk estimasi dan tujuan informasi. Hasil perhitungan dapat berbeda dengan kondisi aktual tergantung pada 
                  komponen penghasilan spesifik, tunjangan, dan kebijakan perusahaan. Untuk perhitungan yang akurat dan komprehensif, 
                  konsultasikan dengan profesional pajak dari JADTRA Consulting.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default TaxCalculator;
