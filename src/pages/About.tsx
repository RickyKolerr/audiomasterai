import {
  Brain,
  Rocket,
  Zap,
  Users,
  Globe2,
  Palette,
  MessageCircle,
  Settings,
  Clock,
  Sparkles,
  BookOpen,
  Hammer,
  Target,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  const technologies = [
    {
      icon: <Brain className="w-8 h-8 text-green-500" />,
      title: "GPT-4 by OpenAI",
      description: "Enhances text processing, restructuring, and summarization for fluid narration.",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-pink-500" />,
      title: "ElevenLabs AI Voices",
      description: "Delivers high-quality, human-like voice synthesis with multiple voice options.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "Kolerr's Smart AI Engine",
      description: "Optimizes voice selection, reading pace, and intonation for the best results.",
    },
  ];

  const features = [
    {
      title: "Fast & Easy",
      description: "Convert books or documents into audiobooks within minutes.",
    },
    {
      title: "High-Quality AI Voices",
      description: "Experience professional narration with advanced voice synthesis.",
    },
    {
      title: "Personalization",
      description: "Customize the voice, speed, and tone to match your preference.",
    },
    {
      title: "Seamless Integration",
      description: "Secure cloud storage and download options for offline listening.",
    },
  ];

  const visionItems = [
    {
      icon: <Globe2 className="w-6 h-6 text-blue-500" />,
      title: "Multilingual Audiobook Generation",
      description: "Supporting multiple languages for a global audience.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-pink-500" />,
      title: "Emotional AI Narration",
      description: "AI that adapts tone and emotion based on content.",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      title: "Library & Bookstore Partnerships",
      description: "Direct integration with publishers and digital libraries.",
    },
  ];

  const team = [
    {
      icon: <Users className="w-6 h-6" />,
      name: "Ricky Anh Nguyen",
      role: "Founder & CEO",
      description: "Visionary entrepreneur and product designer, leading Kolerr Technologies Inc in AI-driven innovation.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      name: "Tony Nguyen",
      role: "Chief AI Engineer",
      description: "Expert in machine learning, natural language processing, and AI-powered speech synthesis.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      name: "Ricky Anh Nguyen",
      role: "Lead Product Designer",
      description: "Designs intuitive interfaces for a seamless user experience.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      name: "Ashley Pham",
      role: "Head of Growth & Marketing",
      description: "Drives brand awareness, user engagement, and global outreach.",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      name: "Tony Nguyen",
      role: "Lead Software Engineer",
      description: "Ensures the backend system runs smoothly with high performance and security.",
    },
  ];

  const timeline = [
    {
      icon: <Clock className="w-6 h-6" />,
      date: "2024",
      title: "The Idea is Born",
      description: "The vision for an AI-powered audiobook generator was conceived.",
    },
    {
      icon: <Hammer className="w-6 h-6" />,
      date: "Q1 2025",
      title: "Product Development Begins",
      description: "Initial UI/UX design and core AI integrations with GPT-4 & ElevenLabs.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      date: "Q2 2025",
      title: "MVP Launch",
      description: "Beta version released for early adopters.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      date: "Q3 2025",
      title: "Official Public Launch",
      description: "Full-featured product release with premium voice options and customization.",
    },
    {
      icon: <Globe2 className="w-6 h-6" />,
      date: "2026 & Beyond",
      title: "Expansion & Innovation",
      description: "Multilingual support, advanced AI voice emotions, and strategic partnerships with publishers.",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text animate-fade-in">
          About Kolerr Technologies Inc
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in [--delay-1]">
          An innovative AI company focused on revolutionizing audiobook generation, making high-quality, AI-powered audiobooks accessible to everyone.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-black/5 dark:bg-white/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-lg text-center text-muted-foreground max-w-3xl mx-auto">
            We believe that reading should be flexible and accessible. Whether you're a student, a busy professional, or an audiobook enthusiast, our technology enables you to listen to any text-based content effortlessly.
          </p>
        </div>
      </section>

      {/* Technology Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Powers Our Technology?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div 
              key={tech.title}
              className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{tech.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
              <p className="text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-black/5 dark:bg-white/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="p-6 rounded-lg bg-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Vision for the Future</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {visionItems.map((item, index) => (
            <div 
              key={item.title}
              className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-black/5 dark:bg-white/5 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.name + member.role}
                className="p-6 rounded-lg bg-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-4">
                  {member.icon}
                  <div className="ml-3">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary">{member.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Company Timeline</h2>
        <div className="max-w-3xl mx-auto">
          {timeline.map((item, index) => (
            <div 
              key={item.date}
              className="flex gap-4 mb-8 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-semibold">{item.date}</span>
                  <span className="text-primary">•</span>
                  <span className="text-lg font-semibold">{item.title}</span>
                </div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;