import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import SEO from "@/components/SEO";
import { ShieldCheck, Award, TrendingUp, BookOpen, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { organizationSchema, breadcrumbSchema } from "@/utils/structuredData";

const About = () => {
  const { t } = useLanguage();

  const values = [
    { icon: ShieldCheck, title: t("about.values.professional.title"), desc: t("about.values.professional.desc") },
    { icon: Award, title: t("about.values.trusted.title"), desc: t("about.values.trusted.desc") },
    { icon: BookOpen, title: t("about.values.educative.title"), desc: t("about.values.educative.desc") },
    { icon: Lightbulb, title: t("about.values.solutif.title"), desc: t("about.values.solutif.desc") },
  ];

  const structuredData = {
    ...organizationSchema,
    foundingDate: '2010',
    description: t("about.overview.p1"),
  };

  const breadcrumbs = [
    { name: 'Home', url: 'https://jadtraconsulting.com' },
    { name: t("about.title"), url: 'https://jadtraconsulting.com/about' },
  ];

  return (
    <>
      <SEO 
        title={t("about.title")}
        description={t("about.overview.p1")}
        keywords="about JADTRA Consulting, company profile, KKP Hakim Muhamad dan Rekan, business consulting firm"
        canonical="https://jadtraconsulting.com/about"
        structuredData={structuredData}
      />
      <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">{t("about.title")}</h1>
              <div className="gold-divider mt-4 mx-auto" />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-secondary dark:bg-secondary/80 section-padding">
        <div className="container-narrow max-w-3xl">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">{t("about.overview.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about.overview.p1")}</p>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about.overview.p2")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about.overview.p3")}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{t("about.vision.title")}</h2>
              <div className="gold-divider mb-6" />
              <p className="text-muted-foreground leading-relaxed">{t("about.vision.text")}</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{t("about.mission.title")}</h2>
              <div className="gold-divider mb-6" />
              <ul className="text-muted-foreground leading-relaxed space-y-3">
                <li className="flex gap-2">
                  <TrendingUp className="text-primary flex-shrink-0 mt-1" size={16} />
                  <span>{t("about.mission.1")}</span>
                </li>
                <li className="flex gap-2">
                  <ShieldCheck className="text-primary flex-shrink-0 mt-1" size={16} />
                  <span>{t("about.mission.2")}</span>
                </li>
                <li className="flex gap-2">
                  <Award className="text-primary flex-shrink-0 mt-1" size={16} />
                  <span>{t("about.mission.3")}</span>
                </li>
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-secondary dark:bg-secondary/80 section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("about.values.title")}</h2>
              <p className="text-muted-foreground mt-2 text-sm tracking-wide">{t("about.values.subtitle")}</p>
              <div className="gold-divider mx-auto mt-4" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {values.map((v, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-6 bg-background border border-border rounded-sm">
                  <v.icon className="text-primary flex-shrink-0 mt-1" size={28} strokeWidth={1.5} />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      </Layout>
    </>
  );
};

export default About;
