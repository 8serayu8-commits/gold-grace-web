import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { ShieldCheck, Award, TrendingUp, BookOpen, Lightbulb } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Profesional (Professional)",
    desc: "Bekerja dengan standar tinggi, teliti, dan sesuai etika profesi. Setiap staf menguasai dasar ilmu perpajakan, akuntansi, maupun hukum, serta terus memperbarui pengetahuan.",
  },
  {
    icon: Award,
    title: "Terpercaya (Trusted)",
    desc: "Kepercayaan adalah pondasi hubungan dengan klien dan sesama tim. Menjaga kerahasiaan data, konsisten menyampaikan informasi yang benar, serta menepati janji dan target waktu.",
  },
  {
    icon: BookOpen,
    title: "Edukatif (Educative)",
    desc: "Setiap laporan, perhitungan, atau opini hukum disertai penjelasan sederhana agar mudah dipahami klien. Di internal, saling berbagi ilmu, mentoring, dan budaya belajar berkelanjutan.",
  },
  {
    icon: Lightbulb,
    title: "Solutif (Solution-Oriented)",
    desc: "Fokus pada pemecahan masalah, bukan hanya formalitas. Dalam situasi ideal maupun darurat, berorientasi pada solusi yang tepat, legal, dan bermanfaat jangka panjang.",
  },
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
            Jadtra Consulting lahir dari perjalanan panjang dan dedikasi di dunia perpajakan, akuntansi, pelatihan, dan legalitas usaha sejak tahun 2010 dengan berdirinya Elhakim and Partner. Elhakim and Partner bertransformasi menjadi Jadtra Consulting (KKP Hakim Muhamad dan Rekan).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pengalaman lebih dari satu dekade membentuk keahlian teknis yang kuat dan melahirkan kepekaan terhadap kebutuhan para pelaku usaha, khususnya UMKM dan pengusaha pemula yang sering kali menghadapi tantangan dalam memahami dan memenuhi kewajiban administratif.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Nama "Jadtra Consulting" sendiri membawa makna filosofis: melambangkan keadilan, kebijaksanaan, dan semangat melindungi klien dalam aspek-aspek vital pengelolaan usaha. Kini, Jadtra Consulting berdiri sebagai entitas profesional yang tidak hanya berorientasi pada penyelesaian masalah klien, tetapi juga tumbuh sebagai wadah pembinaan SDM muda yang potensial.
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
              "Menjadi Mitra Strategis yang memberikan kepastian, pertumbuhan, dan keberlanjutan usaha melalui layanan yang Profesional, Terpercaya, Edukatif, dan Solutif."
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Mission</h2>
            <div className="gold-divider mb-6" />
            <ul className="text-muted-foreground leading-relaxed space-y-3">
              <li className="flex gap-2">
                <TrendingUp className="text-primary flex-shrink-0 mt-1" size={16} />
                <span>Mendukung pertumbuhan dan keberlanjutan entitas bisnis melalui wawasan strategis dan data yang akurat.</span>
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="text-primary flex-shrink-0 mt-1" size={16} />
                <span>Memberikan kepastian dan rasa aman dalam penyelesaian kewajiban pajak, akuntansi, dan hukum.</span>
              </li>
              <li className="flex gap-2">
                <Award className="text-primary flex-shrink-0 mt-1" size={16} />
                <span>Membina SDM menjadi ahli dan beretika di bidang pajak, akuntansi, dan hukum.</span>
              </li>
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>

    {/* Core Values — Budaya ProTEkSi */}
    <section className="bg-secondary section-padding">
      <div className="container-narrow">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              Budaya ProTEkSi
            </h2>
            <p className="text-muted-foreground mt-2 text-sm tracking-wide">Our Core Values</p>
            <div className="gold-divider mx-auto mt-4" />
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.1}>
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
);

export default About;
