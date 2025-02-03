import { Shield, Lock, Key, Database, AlertTriangle, CheckSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const navigate = useNavigate();

  const securitySections = [
    {
      icon: Shield,
      title: "Encryption Standards",
      content: [
        "End-to-end encryption for all data transmission",
        "AES-256 encryption for stored files",
        "SSL/TLS protocols for secure communication",
        "Regular security audits and updates"
      ]
    },
    {
      icon: Lock,
      title: "Authentication & Access",
      content: [
        "Secure email/password authentication",
        "Optional two-factor authentication (2FA)",
        "Secure password recovery process",
        "Session management and automatic timeouts"
      ]
    },
    {
      icon: Key,
      title: "API Security",
      content: [
        "Secure OpenAI API integration",
        "Protected ElevenLabs API access",
        "API key rotation and monitoring",
        "Rate limiting and request validation"
      ]
    },
    {
      icon: Database,
      title: "Data Protection",
      content: [
        "Regular automated backups",
        "Geographic data redundancy",
        "Secure cloud storage infrastructure",
        "Data recovery procedures"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Incident Response",
      content: [
        "24/7 security monitoring",
        "Immediate breach notification",
        "Dedicated security response team",
        "Regular security assessments"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Security
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Policy</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We prioritize the security of your data and maintain strict protocols to ensure your information
            remains protected at all times.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {securitySections.map((section, index) => (
            <Card 
              key={section.title}
              className={`p-6 hover:shadow-lg transition-all duration-300 animate-fade-in border border-green-500/20`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <section.icon className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-2">
                    {section.content.map((item, i) => (
                      <li key={i} className="text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6 animate-fade-in">
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate("/privacy")}
              className="group"
            >
              <Shield className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Privacy Policy
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground group"
            >
              <CheckSquare className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Security;