import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Briefcase, Calculator, Monitor, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Briefcase, title: t("services.business.title"), desc: t("services.business.desc") },
    { icon: Calculator, title: t("services.tax.title"), desc: t("services.tax.desc") },
    { icon: Monitor, title: t("services.digital.title"), desc: t("services.digital.desc") },
    { icon: Settings, title: t("services.system.title"), desc: t("services.system.desc") },
  ];

  return (
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
  );
};

export default Services;
