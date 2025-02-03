import { useState } from "react";
import { Book, FileText, Code, HelpCircle, Lock, GitPullRequest, Search, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("getting-started");

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Book,
      items: [
        { title: "Overview", description: "Quick guide to setting up your account and platform" },
        { title: "Key Features", description: "Introduction to the primary functionalities of the platform" },
        { title: "First Steps", description: "How to convert your first book into an audiobook" },
      ],
    },
    {
      id: "api-docs",
      title: "API Documentation",
      icon: Code,
      items: [
        { title: "OpenAI GPT-4 Integration", description: "Learn how to interact with our GPT-4 API" },
        { title: "ElevenLabs API", description: "Step-by-step guide on voice customization" },
        { title: "Authentication", description: "Implement user authentication and management" },
        { title: "Audio Conversion", description: "Upload and convert books to audiobooks" },
      ],
    },
    {
      id: "integration",
      title: "Integration Guides",
      icon: GitPullRequest,
      items: [
        { title: "Web & Mobile Integration", description: "Integrate our API into your applications" },
        { title: "Third-Party Services", description: "Connect with external services" },
      ],
    },
    {
      id: "faq",
      title: "FAQs & Troubleshooting",
      icon: HelpCircle,
      items: [
        { title: "Common Issues", description: "Solutions to frequent problems" },
        { title: "Optimization Guide", description: "Optimize content for better conversion" },
      ],
    },
    {
      id: "security",
      title: "Security & Privacy",
      icon: Lock,
      items: [
        { title: "Data Handling", description: "How we handle and secure your data" },
        { title: "Compliance", description: "Our compliance with privacy regulations" },
      ],
    },
    {
      id: "releases",
      title: "Release Notes",
      icon: FileText,
      items: [
        { title: "Latest Updates", description: "Recent features and improvements" },
        { title: "Change Log", description: "Detailed history of changes" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in [--delay-0]">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
              Kolerr Technologies Inc
            </span>{" "}
            Documentation
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find detailed guides, API documentation, integration steps, and troubleshooting resources to help you get started.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in [--delay-1]">
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
        <div className="grid md:grid-cols-[250px_1fr] gap-8 animate-fade-in [--delay-2]">
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
                <div className="grid sm:grid-cols-2 gap-4">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
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