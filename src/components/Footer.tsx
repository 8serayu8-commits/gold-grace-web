import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-dark text-background">
    <div className="container-narrow py-16 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h3 className="font-heading text-xl font-bold mb-2">JADTRA CONSULTING</h3>
          <p className="text-sm text-background/50">
            KKP Hakim Muhamad dan Rekan
          </p>
          <div className="gold-divider mt-4" />
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-medium uppercase tracking-wider text-primary mb-4">
            Navigation
          </h4>
          <nav className="flex flex-col gap-2">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-sm text-background/60 hover:text-primary transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-medium uppercase tracking-wider text-primary mb-4">
            Contact
          </h4>
          <div className="text-sm text-background/60 space-y-1">
            <p>info@jadtraconsulting.com</p>
            <p>+62 21 0000 0000</p>
            <p>Jakarta, Indonesia</p>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10 mt-12 pt-8 text-center text-xs text-background/40">
        © {new Date().getFullYear()} JADTRA Consulting. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
