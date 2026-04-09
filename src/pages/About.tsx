import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Heart, Award, TrendingUp } from "lucide-react";

const values = [
  { icon: Heart, title: "Integrity", desc: "We uphold the highest ethical standards in every engagement." },
  { icon: Award, title: "Professionalism", desc: "Delivering excellence through expertise, precision, and accountability." },
  { icon: TrendingUp, title: "Growth", desc: "Committed to creating lasting value and sustainable progress." },
];

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">About Us</h1>
          <div className="gold-divider mt-4" />
        </FadeIn>
      </div>
    </section>

    {/* Overview */}
    <section className="bg-secondary section-padding">
      <div className="container-narrow max-w-3xl">
        <FadeIn>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Company Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            JADTRA Consulting operates under KKP Hakim Muhamad dan Rekan, a registered professional consulting practice. We specialize in providing comprehensive business advisory, tax compliance, and digital transformation services to organizations seeking sustainable growth.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With a deep understanding of the Indonesian business landscape, our team combines local expertise with global best practices to deliver solutions that are both practical and forward-thinking.
          </p>
        </FadeIn>
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="section-padding">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Vision</h2>
            <div className="gold-divider mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              To become the most trusted and respected consulting partner in Indonesia, empowering businesses to achieve their full potential through strategic insight and innovation.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Mission</h2>
            <div className="gold-divider mb-6" />
            <p className="text-muted-foreground leading-relaxed">
              To deliver professional, transparent, and results-driven consulting services that help our clients navigate complexity, ensure compliance, and unlock new opportunities for growth.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Core Values */}
    <section className="bg-secondary section-padding">
      <div className="container-narrow">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Core Values</h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.1}>
              <div className="text-center">
                <v.icon className="text-primary mx-auto mb-4" size={32} strokeWidth={1.5} />
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
