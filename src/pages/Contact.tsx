import { useState } from "react";
import Layout from "@/components/Layout";
import FadeIn from "@/components/FadeIn";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t("contact.form.success"));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground">{t("contact.title")}</h1>
            <div className="gold-divider mt-4" />
          </FadeIn>
        </div>
      </section>

      <section className="bg-secondary section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{t("contact.form.title")}</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.form.name")}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.form.email")}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">{t("contact.form.message")}</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-primary text-primary-foreground font-medium text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
                >
                  {t("contact.form.submit")}
                </button>
              </form>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">{t("contact.office.title")}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-primary mt-0.5" size={20} strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t("contact.office.email")}</p>
                    <p className="text-sm text-muted-foreground">info@jadtraconsulting.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-primary mt-0.5" size={20} strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t("contact.office.phone")}</p>
                    <p className="text-sm text-muted-foreground">+62 21 0000 0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-primary mt-0.5" size={20} strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{t("contact.office.address")}</p>
                    <p className="text-sm text-muted-foreground">Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 w-full h-48 bg-muted border border-border flex items-center justify-center">
                <span className="text-sm text-muted-foreground">{t("contact.office.map")}</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
