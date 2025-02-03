import { 
  Building2, 
  Handshake, 
  Globe, 
  Users, 
  Rocket,
  MessageSquare,
  BookOpen,
  Cloud,
  Brain,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Partners = () => {
  const { toast } = useToast();

  const partners = [
    {
      name: "OpenAI (GPT-4)",
      description: "OpenAI provides us with advanced natural language processing capabilities, enabling our platform to process books, study materials, and other textual content with remarkable accuracy and ease.",
      icon: Brain,
      category: "AI Technology"
    },
    {
      name: "ElevenLabs",
      description: "ElevenLabs powers our platform's high-quality, natural-sounding AI voices, offering a range of customizable options for users. This partnership allows us to bring personalized audiobook experiences to life.",
      icon: MessageSquare,
      category: "Voice Technology"
    },
    {
      name: "Amazon Web Services (AWS)",
      description: "AWS provides us with the infrastructure to scale our platform securely and efficiently. From cloud storage to computing power, AWS ensures we can handle large volumes of content and users globally.",
      icon: Cloud,
      category: "Infrastructure"
    },
    {
      name: "Google Cloud",
      description: "With powerful tools and AI models, Google Cloud enhances our system's data analytics, AI learning, and overall system performance.",
      icon: Cloud,
      category: "Infrastructure"
    },
    {
      name: "Book Publishers & Authors",
      description: "We collaborate with leading book publishers and authors to bring their content to users in audio format, offering a seamless experience for audiobook lovers.",
      icon: BookOpen,
      category: "Content Partners"
    }
  ];

  const handlePartnershipRequest = () => {
    toast({
      title: "Partnership Request",
      description: "Thank you for your interest! Our team will contact you soon.",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
          <Handshake className="w-16 h-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold">
            Our Trusted
            <span className="bg-gradient-to-r from-primary via-accent to-primary text-transparent bg-clip-text"> Partners</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            At Kolerr Technologies Inc, we understand the importance of collaboration in driving innovation. 
            Our strategic partnerships help us deliver the best AI-powered audiobook experience to our users.
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={partner.name}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary transition-colors duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <partner.icon className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-xl">{partner.name}</h3>
                  <p className="text-sm text-muted-foreground">{partner.category}</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Become a Partner Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center max-w-3xl mx-auto">
          <Globe className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            If you're a publisher, technology provider, or educational institution interested in joining forces with 
            Kolerr Technologies Inc, we'd love to hear from you!
          </p>
          <Button 
            size="lg" 
            onClick={handlePartnershipRequest}
            className="group"
          >
            Contact Us About Partnership
            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Partners;