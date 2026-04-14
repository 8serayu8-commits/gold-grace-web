import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";
import Breadcrumb from "@/components/Breadcrumb";
import PPh21Calculator from "@/components/PPh21Calculator";
import { Calculator } from "lucide-react";
import { articleSchema, breadcrumbSchema } from "@/utils/structuredData";
import { useLanguage } from "@/contexts/LanguageContext";

const TaxCalculator = () => {
  const { t, language } = useLanguage();
  
  const breadcrumbs = [
    { name: t('home'), url: 'https://jadtraweb.vercel.app' },
    { name: t('taxCalculator'), url: 'https://jadtraweb.vercel.app/tax-calculator' },
  ];

  const structuredData = articleSchema(
    t('taxCalculatorTitle'),
    t('taxCalculatorDescription'),
    "2024-04-10",
    "Tim JADTRA Consulting"
  );

  return (
    <>
      <SEO 
        title={t('taxCalculatorTitle') + " - Gratis & Akurat"}
        description={t('taxCalculatorDescription')}
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
                  {t('taxCalculatorTitle')}
                </h1>
              </div>
              <div className="gold-divider mt-4" />
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {t('taxCalculatorIntro')}
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
                <h2>{t('aboutTaxCalculator')}</h2>
                <p>
                  {t('taxCalculatorAboutText')}
                </p>
                
                <h3>{t('calculatorFeatures')}</h3>
                <ul>
                  <li>{t('feature1')}</li>
                  <li>{t('feature2')}</li>
                  <li>{t('feature3')}</li>
                  <li>{t('feature4')}</li>
                  <li>{t('feature5')}</li>
                </ul>
                
                <h3>{t('howToUse')}</h3>
                <ol>
                  <li>{t('step1')}</li>
                  <li>{t('step2')}</li>
                  <li>{t('step3')}</li>
                  <li>{t('step4')}</li>
                </ol>
                
                <h3>{t('disclaimer')}</h3>
                <p>
                  {t('taxCalculatorDisclaimer')}
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
