import { Link } from "react-router-dom";
import { Briefcase, Calculator, Monitor, Settings, Award, ShieldCheck, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";

const services = [
  { icon: Briefcase, title: "Business Consulting", desc: "Strategic guidance for sustainable business growth and operational excellence." },
  { icon: Calculator, title: "Tax & Accounting Advisory", desc: "Expert tax planning, compliance, and financial advisory services." },
  { icon: Monitor, title: "Digital Transformation", desc: "Modernize your business with cutting-edge digital solutions and processes." },
  { icon: Settings, title: "System Development Planning", desc: "Comprehensive planning for scalable and efficient system architectures." },
];

const whyUs = [
  { icon: Award, title: "Professional & Experienced", desc: "Backed by years of industry expertise and a proven track record." },
  { icon: ShieldCheck, title: "Trusted & Reliable", desc: "We build lasting relationships founded on transparency and integrity." },
  { icon: TrendingUp, title: "Growth-Oriented Approach", desc: "Every strategy is designed to drive measurable, long-term results." },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="container-narrow relative">
        <FadeIn>
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Trusted Consulting Partner for Business Growth
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Professional consulting services in business, taxation, and digital systems.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-10 px-8 py-3.5 bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              Consult Now
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
              JADTRA Consulting is a professional consulting firm under KKP Hakim Muhamad dan Rekan, providing strategic and reliable business solutions.
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
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

    {/* Why Us */}
    <section className="bg-secondary section-padding">
      <div className="container-narrow">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Why Choose Us</h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {whyUs.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <div className="text-center">
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
    <section className="bg-dark section-padding">
      <div className="container-narrow text-center">
        <FadeIn>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-background mb-6">
            Build a Strong Foundation for Your Business Today
          </h2>
          <Link
            to="/contact"
            className="inline-block px-8 py-3.5 bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </FadeIn>
      </div>
    </section>
  </Layout>
);

export default Index;
