import { Shield, FileText, Scale, Lock, CheckSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Shield,
      title: "User Responsibilities",
      content: [
        "Use the platform responsibly and legally",
        "Do not upload unauthorized or copyrighted content",
        "Maintain account security and confidentiality",
        "Report any suspicious activities or violations"
      ]
    },
    {
      icon: FileText,
      title: "Content Ownership",
      content: [
        "Users retain rights to uploaded content",
        "Generated audio files are for personal use",
        "We do not claim ownership of your materials",
        "Sharing and distribution guidelines apply"
      ]
    },
    {
      icon: Scale,
      title: "Service Limitations",
      content: [
        "AI-generated content accuracy may vary",
        "Service availability is subject to maintenance",
        "Processing times depend on file size and type",
        "Premium features have usage limitations"
      ]
    },
    {
      icon: Lock,
      title: "Subscription & Payment",
      content: [
        "Transparent pricing and billing cycles",
        "Refund requests within 30 days",
        "Automatic renewal unless cancelled",
        "Premium features access terms"
      ]
    },
    {
      icon: CheckSquare,
      title: "Legal Compliance",
      content: [
        "Copyright and intellectual property laws",
        "Content moderation policies",
        "Data protection and privacy rules",
        "Dispute resolution procedures"
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
            Terms of
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Service</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Please read these terms carefully before using AudioMaster AI. By accessing or using our service,
            you agree to be bound by these terms and conditions.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <Card 
              key={section.title}
              className={`p-6 hover:shadow-lg transition-all duration-300 animate-fade-in border border-border/50`}
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
              <Lock className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Privacy Policy
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground group"
            >
              <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Contact Support
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Terms;