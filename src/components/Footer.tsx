import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import jadtraLogo from "@/assets/jadtra-logo.jpg";

const Footer = () => {
  const { t } = useLanguage();

  const navItems = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.about"), path: "/about" },
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <footer className="bg-dark text-background">
      <div className="container-narrow py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img src={jadtraLogo} alt="JADTRA Consulting" className="h-16 w-auto brightness-0 invert mb-4" />
            <p className="text-sm text-background/50">KKP Hakim Muhamad dan Rekan</p>
            <div className="gold-divider mt-4" />
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-primary mb-4">
              {t("footer.navigation")}
            </h4>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-background/60 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider text-primary mb-4">
              {t("footer.contact")}
            </h4>
            <div className="text-sm text-background/60 space-y-1">
              <p>info@jadtraconsulting.com</p>
              <p>+62 21 0000 0000</p>
              <p>Jakarta, Indonesia</p>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-12 pt-8 text-center text-xs text-background/40">
          © {new Date().getFullYear()} JADTRA Consulting. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
