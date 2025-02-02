import { Link } from "react-router-dom";
import { Book, Users, HelpCircle, Shield, FileText, Lock, Info, MessageSquare, Briefcase, DollarSign } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const Footer = () => {
  const { t } = useLanguage();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features", icon: Book },
        { name: "Pricing", href: "/pricing", icon: DollarSign },
        { name: "Documentation", href: "/docs", icon: FileText },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about", icon: Info },
        { name: "Blog", href: "/blog", icon: MessageSquare },
        { name: "Careers", href: "/careers", icon: Briefcase },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Community", href: "/community", icon: Users },
        { name: "Help Center", href: "/help", icon: HelpCircle },
        { name: "Partners", href: "/partners", icon: Users },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy", icon: Lock },
        { name: "Terms", href: "/terms", icon: FileText },
        { name: "Security", href: "/security", icon: Shield },
      ]
    }
  ];

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {footerSections.map((section, idx) => (
            <div key={section.title} className={cn(
              "space-y-6",
              "animate-fade-in [--animation-delay:var(--delay-${idx})]"
            )}>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <link.icon className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                      <span className="text-lg">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} AudioMaster AI. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link to="/security" className="text-gray-400 hover:text-white text-sm transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;