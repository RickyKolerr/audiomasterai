import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Database, UserCog, Server } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "User account information (email, name, preferences)",
        "Uploaded documents and books for conversion",
        "Voice and audio preferences",
        "Usage data and interaction with our services",
        "Payment information (processed securely via Stripe)"
      ]
    },
    {
      icon: Server,
      title: "How We Use Your Data",
      content: [
        "Generate high-quality audiobooks from your documents",
        "Personalize your experience and voice preferences",
        "Improve our AI conversion technology",
        "Send important updates about our service",
        "Process payments and manage subscriptions"
      ]
    },
    {
      icon: Lock,
      title: "Data Sharing & Security",
      content: [
        "We never sell your personal data",
        "Limited data sharing with AI service providers for conversion",
        "Industry-standard encryption for all stored data",
        "Regular security audits and updates",
        "Secure cloud storage with restricted access"
      ]
    },
    {
      icon: UserCog,
      title: "Your Rights & Controls",
      content: [
        "Access and download your personal data",
        "Request deletion of your account and data",
        "Opt-out of marketing communications",
        "Update or correct your information",
        "Control your privacy preferences"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Privacy
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Policy</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We prioritize your privacy and data security. Learn how we protect your information
            while delivering exceptional audiobook conversion services.
          </p>
        </div>

        {/* Last Updated */}
        <div className="text-center mb-16 text-sm text-gray-400">
          Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {sections.map((section, index) => (
            <div 
              key={section.title}
              className={`
                bg-black/50 border border-green-500/20 rounded-lg p-8
                transform hover:scale-[1.02] transition-transform
                animate-fade-in
              `}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-center gap-4 mb-6">
                <section.icon className="w-8 h-8 text-green-500" />
                <h2 className="text-2xl font-bold">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.content.map((item, i) => (
                  <li 
                    key={i}
                    className="flex items-start gap-2 text-gray-300"
                  >
                    <span className="text-green-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Questions About Your Privacy?</h2>
          <p className="text-gray-400 mb-6">
            If you have any questions about our privacy policy or how we handle your data,
            please don't hesitate to contact our privacy team.
          </p>
          <a 
            href="mailto:privacy@audiomaster.ai" 
            className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors"
          >
            privacy@audiomaster.ai
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Privacy;