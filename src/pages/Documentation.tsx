import { useState } from "react";
import { Book, FileText, Mic2, Share2, Crown, Upload, Search, ChevronRight, HelpCircle, Shield, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    {
      id: "overview",
      title: "Overview",
      icon: Book,
      content: {
        title: "Overview",
        description: "Our application is designed to help users convert books, study materials, and other documents into high-quality audio formats. With easy-to-use features like voice customization, download options, and seamless sharing, our goal is to provide a seamless audio experience for every user.",
      },
    },
    {
      id: "key-features",
      title: "Key Features",
      icon: FileText,
      items: [
        {
          title: "Smart Conversion",
          description: "Convert your favorite books and documents into high-quality audiobooks effortlessly. Simply upload your material, and our application handles the conversion process.",
          icon: Book,
        },
        {
          title: "Voice Customization",
          description: "Choose from a variety of voices and adjust them to your preference. Personalize your listening experience to suit your tastes and style.",
          icon: Mic2,
        },
        {
          title: "Share & Download",
          description: "Share your audiobooks with friends or download them for offline listening. Take your audio content with you wherever you go.",
          icon: Share2,
        },
        {
          title: "Premium Voices",
          description: "Gain access to premium, natural-sounding voices, elevating your audio experience to a new level.",
          icon: Crown,
        },
        {
          title: "Study Materials",
          description: "Convert your study notes and other educational content into audio format, making it easier to study on the go.",
          icon: FileText,
        },
        {
          title: "Easy Upload",
          description: "Upload your materials easily using our drag-and-drop interface. The process is simple, quick, and user-friendly.",
          icon: Upload,
        },
      ],
    },
    {
      id: "getting-started",
      title: "Getting Started",
      icon: ChevronRight,
      content: {
        title: "Getting Started",
        description: "To start using the platform, simply sign up, choose your materials, and follow the easy steps to convert them into audio. Once your conversion is complete, you can customize the voice, share the content, or download it for offline use.",
        steps: [
          "Sign up using your email or other supported methods. You'll need to verify your email address to complete the registration.",
          "Use the drag-and-drop feature to upload your documents. Supported file types will be listed.",
          "Once uploaded, the system will automatically start the conversion process. You'll receive a notification once your audiobook is ready.",
          "After conversion, you can choose from various voice options. Adjust the pitch, speed, and tone to create your ideal listening experience.",
          "Once you're satisfied with your audiobook, you can share it via email or download it directly to your device for offline listening.",
        ],
      },
    },
    {
      id: "faqs",
      title: "FAQs",
      icon: HelpCircle,
      items: [
        {
          title: "How long does the conversion take?",
          description: "The conversion time depends on the length of the document or book being converted. Typically, shorter materials are converted faster.",
        },
        {
          title: "Can I upload my own content?",
          description: "Yes, you can upload your own documents, including PDFs, Word files, and other supported formats.",
        },
        {
          title: "Is there a limit to the number of books I can convert?",
          description: "The number of books you can convert depends on the plan you choose. Free users have a limited number of conversions, while premium users enjoy unlimited conversions.",
        },
      ],
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: Shield,
      content: {
        title: "Security & Privacy",
        description: "Your privacy and data security are our top priority. We use industry-standard encryption and adhere to the best practices to protect your information.",
      },
    },
    {
      id: "support",
      title: "Technical Support",
      icon: MessageCircle,
      content: {
        title: "Technical Support",
        description: "If you encounter any issues or need assistance, please visit our Help Center or contact our customer support team for help. We are committed to ensuring that your experience is as smooth as possible.",
      },
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in [--delay:0ms]">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
              Audiovable
            </span>{" "}
            Documentation
            <span className="block text-lg text-gray-400 mt-2">by Kolerr Technologies</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This page is designed to help you understand how to use the features and functionality of our platform in a simple and clear manner.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in [--delay:200ms]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search documentation..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Documentation Content */}
        <div className="grid md:grid-cols-[250px_1fr] gap-8 animate-fade-in [--delay:400ms]">
          {/* Sidebar Navigation */}
          <ScrollArea className="h-[calc(100vh-200px)] sticky top-20 hidden md:block">
            <nav className="space-y-2 pr-4">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    activeSection === section.id && "bg-secondary"
                  )}
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon className="w-4 h-4" />
                  {section.title}
                </Button>
              ))}
            </nav>
          </ScrollArea>

          {/* Main Content */}
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.id}
                className={cn(
                  "space-y-4",
                  activeSection !== section.id && "hidden md:block"
                )}
              >
                <div className="flex items-center gap-2 text-2xl font-semibold">
                  <section.icon className="w-6 h-6" />
                  {section.title}
                </div>
                
                {section.content && (
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-muted-foreground">{section.content.description}</p>
                    {section.content.steps && (
                      <ol className="list-decimal pl-4 space-y-2 mt-4">
                        {section.content.steps.map((step, index) => (
                          <li key={index} className="text-muted-foreground">{step}</li>
                        ))}
                      </ol>
                    )}
                  </div>
                )}

                {section.items && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {section.items.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 group cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {item.icon && <item.icon className="w-4 h-4 text-primary" />}
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {item.title}
                            </h3>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Documentation;