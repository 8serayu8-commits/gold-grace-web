import { Link } from "react-router-dom";
import {
  Briefcase, Calculator, Monitor, Settings, Award, ShieldCheck, TrendingUp,
  MessageSquare, Search, Rocket, BarChart3, Lock, Workflow, Handshake,
  CheckCircle2, BarChart, Zap, Target
} from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Briefcase, title: t("home.services.business.title"), desc: t("home.services.business.desc") },
    { icon: Calculator, title: t("home.services.tax.title"), desc: t("home.services.tax.desc") },
    { icon: Monitor, title: t("home.services.digital.title"), desc: t("home.services.digital.desc") },
    { icon: Settings, title: t("home.services.system.title"), desc: t("home.services.system.desc") },
  ];

  const whyUs = [
    { icon: Award, title: t("home.whyUs.professional.title"), desc: t("home.whyUs.professional.desc") },
    { icon: ShieldCheck, title: t("home.whyUs.trusted.title"), desc: t("home.whyUs.trusted.desc") },
    { icon: TrendingUp, title: t("home.whyUs.growth.title"), desc: t("home.whyUs.growth.desc") },
  ];

  const steps = [
    { icon: MessageSquare, num: "01", title: t("home.howWeWork.step1.title"), desc: t("home.howWeWork.step1.desc") },
    { icon: Search, num: "02", title: t("home.howWeWork.step2.title"), desc: t("home.howWeWork.step2.desc") },
    { icon: Rocket, num: "03", title: t("home.howWeWork.step3.title"), desc: t("home.howWeWork.step3.desc") },
    { icon: BarChart3, num: "04", title: t("home.howWeWork.step4.title"), desc: t("home.howWeWork.step4.desc") },
  ];

  const trustReasons = [
    { icon: Award, title: t("home.trust.professional.title"), desc: t("home.trust.professional.desc") },
    { icon: Lock, title: t("home.trust.confidential.title"), desc: t("home.trust.confidential.desc") },
    { icon: Workflow, title: t("home.trust.structured.title"), desc: t("home.trust.structured.desc") },
    { icon: Handshake, title: t("home.trust.partnership.title"), desc: t("home.trust.partnership.desc") },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container-narrow relative">
          <FadeIn>
            <div className="max-w-2xl">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
                {t("home.hero.title")}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                {t("home.hero.desc")}
              </p>
              <Link
                to="/contact"
                className="inline-block mt-10 px-8 py-3.5 bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all duration-300"
              >
                {t("home.hero.cta")}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-secondary section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="gold-divider mx-auto mb-8" />
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("home.intro")}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("home.services.title")}</h2>
              <div className="gold-divider mx-auto mt-4" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group p-8 bg-background border border-border rounded-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <s.icon className="text-primary mb-5" size={28} strokeWidth={1.5} />
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-secondary section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("home.howWeWork.title")}</h2>
              <div className="gold-divider mx-auto mt-4" />
            </div>
          </FadeIn>
          <div className="relative">
            <div className="hidden md:block absolute top-16 left-[calc(12.5%+14px)] right-[calc(12.5%+14px)] h-[2px] bg-primary/30" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
              {steps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <div className="relative text-center group">
                    {i < steps.length - 1 && (
                      <div className="md:hidden absolute left-1/2 top-[72px] w-[2px] h-[calc(100%+2rem)] bg-primary/20 -translate-x-1/2" />
                    )}
                    <div className="relative z-10 w-14 h-14 mx-auto rounded-full bg-background border-2 border-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <step.icon size={22} strokeWidth={1.5} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-medium text-primary tracking-widest uppercase">{step.num}</span>
                    <h3 className="font-heading text-lg font-semibold text-foreground mt-1 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Clients Trust Us */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("home.trust.title")}</h2>
              <div className="gold-divider mx-auto mt-4" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {trustReasons.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group text-center p-6 rounded-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-background border border-transparent hover:border-border">
                  <item.icon className="text-primary mx-auto mb-4" size={30} strokeWidth={1.5} />
                  <h3 className="font-heading text-base font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-secondary section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("home.approach.title")}</h2>
                <div className="gold-divider mt-4 mb-8" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {t("home.approach.desc")}
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: BarChart, label: t("home.approach.data") },
                    { icon: Zap, label: t("home.approach.practical") },
                    { icon: Target, label: t("home.approach.scalable") },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <item.icon className="text-primary flex-shrink-0" size={20} strokeWidth={1.5} />
                      <span className="text-foreground font-medium text-sm">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="aspect-square relative">
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-sm rotate-3" />
                  <div className="absolute inset-4 border-2 border-primary/30 rounded-sm -rotate-2" />
                  <div className="absolute inset-8 bg-primary/5 rounded-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Target className="text-primary" size={32} strokeWidth={1.5} />
                      </div>
                      <p className="font-heading text-lg font-semibold text-foreground">{t("home.approach.graphic.title")}</p>
                      <p className="text-muted-foreground text-sm mt-1">{t("home.approach.graphic.sub")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">{t("home.whyUs.title")}</h2>
              <div className="gold-divider mx-auto mt-4" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {whyUs.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center group p-6 rounded-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <item.icon className="text-primary mx-auto mb-4" size={32} strokeWidth={1.5} />
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ backgroundColor: "hsl(0 0% 4%)" }}>
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight">
              {t("home.cta.title")}
            </h2>
            <p className="text-background/60 text-lg mb-10 max-w-xl mx-auto">
              {t("home.cta.desc")}
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-primary/90 hover:shadow-[0_0_24px_hsl(var(--primary)/0.5)] transition-all duration-300"
            >
              {t("home.cta.button")}
            </Link>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
