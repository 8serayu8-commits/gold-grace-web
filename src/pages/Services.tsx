import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";
import { Briefcase, Calculator, Monitor, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { serviceSchema, breadcrumbSchema } from "@/utils/structuredData";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Briefcase, title: t("services.business.title"), desc: t("services.business.desc") },
    { icon: Calculator, title: t("services.tax.title"), desc: t("services.tax.desc") },
    { icon: Monitor, title: t("services.digital.title"), desc: t("services.digital.desc") },
    { icon: Settings, title: t("services.system.title"), desc: t("services.system.desc") },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t("services.title"),
    description: 'Professional business consulting, tax advisory, and digital transformation services',
    provider: {
      '@type': 'Organization',
      name: 'JADTRA Consulting',
      url: 'https://jadtraconsulting.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Professional Services',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.desc,
        },
      })),
    },
  };

  const breadcrumbs = [
    { name: 'Home', url: 'https://jadtraconsulting.com' },
    { name: t("services.title"), url: 'https://jadtraconsulting.com/services' },
  ];

  return (
    <>
      <SEO 
        title={t("services.title")}
        description="Comprehensive business consulting, tax advisory, digital transformation, and system development services"
        keywords="business consulting services, tax advisory services, digital transformation, system development, professional services Indonesia"
        canonical="https://jadtraconsulting.com/services"
        structuredData={structuredData}
      />
      <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">{t("services.title")}</h1>
            <div className="gold-divider mt-4" />
          </FadeIn>
        </div>
      </section>

      {services.map((s, i) => (
        <section key={i} className={`section-padding ${i % 2 === 0 ? "bg-secondary" : ""}`}>
          <div className="container-narrow max-w-3xl">
            <FadeIn>
              <div className="flex items-start gap-5">
                <s.icon className="text-primary flex-shrink-0 mt-1" size={28} strokeWidth={1.5} />
                <div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">{s.title}</h2>
                  <div className="gold-divider mb-6" />
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      ))}
      </Layout>
    </>
  );
};

export default Services;
