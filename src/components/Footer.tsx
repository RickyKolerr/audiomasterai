import { Link } from "react-router-dom";
import { Book, Users, HelpCircle, Shield, FileText, Lock, Info, MessageSquare, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const footerSections = {
    product: {
      title: "Product",
      links: [
        { name: "Features", href: "/features", icon: Book },
        { name: "Pricing", href: "/pricing", icon: Shield },
        { name: "Documentation", href: "/docs", icon: FileText },
      ]
    },
    company: {
      title: "Company",
      links: [
        { name: "About", href: "/about", icon: Info },
        { name: "Blog", href: "/blog", icon: MessageSquare },
        { name: "Careers", href: "/careers", icon: Briefcase },
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Community", href: "/community", icon: Users },
        { name: "Help Center", href: "/help", icon: HelpCircle },
        { name: "Partners", href: "/partners", icon: Users },
      ]
    },
    legal: {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy", icon: Lock },
        { name: "Terms", href: "/terms", icon: FileText },
        { name: "Security", href: "/security", icon: Shield },
      ]
    }
  };

  return (
    <footer className="bg-black py-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="group flex items-center text-gray-400 hover:text-primary transition-colors duration-200"
                    >
                      <link.icon className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100" />
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} PWAMaster. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-gray-400 hover:text-primary text-sm">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-primary text-sm">
                Privacy
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-primary text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;