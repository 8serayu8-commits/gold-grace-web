import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Briefcase, Calculator, Monitor, Settings } from "lucide-react";

const services = [
  {
    icon: Briefcase,
    title: "Business Consulting",
    desc: "We provide end-to-end business advisory services—from market entry strategy and operational optimization to risk management and organizational restructuring. Our consultants work closely with your leadership team to identify opportunities and drive sustainable competitive advantage.",
  },
  {
    icon: Calculator,
    title: "Tax & Accounting Advisory",
    desc: "Navigate Indonesia's complex tax landscape with confidence. Our services include corporate tax planning, individual tax compliance, transfer pricing documentation, tax dispute resolution, and comprehensive accounting and bookkeeping support.",
  },
  {
    icon: Monitor,
    title: "Digital Transformation",
    desc: "Accelerate your business through technology. We help organizations adopt modern digital tools, automate workflows, implement cloud-based systems, and develop data-driven strategies that enhance efficiency and customer experience.",
  },
  {
    icon: Settings,
    title: "System Development Planning",
    desc: "From requirements analysis to architecture design, we guide your team through the entire system development lifecycle. Our planning services ensure your technology investments are scalable, secure, and aligned with your long-term business objectives.",
  },
];

const Services = () => (
  <Layout>
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Our Services</h1>
          <div className="gold-divider mt-4" />
        </FadeIn>
      </div>
    </section>

    {services.map((s, i) => (
      <section key={s.title} className={`section-padding ${i % 2 === 0 ? "bg-secondary" : ""}`}>
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

export default Services;
