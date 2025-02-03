import { motion } from "framer-motion";
import {
  BookOpen,
  User,
  Headphones,
  Cpu,
  Brain,
  Code,
  ThumbsUp,
  Rocket,
  Globe,
  Calendar,
  Microscope,
  Hammer,
  Target,
  Globe2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const teamMembers = [
    {
      name: "Rickie Films",
      role: "Founder & CEO",
      description: "Visionary entrepreneur and product designer, leading Kolerr Technologies Inc in AI-driven innovation.",
      icon: User,
    },
    {
      name: "Sarah Chen",
      role: "Chief AI Engineer",
      description: "Expert in machine learning, natural language processing, and AI-powered speech synthesis.",
      icon: Brain,
    },
    {
      name: "Alex Rivera",
      role: "Lead Product Designer",
      description: "Designs intuitive interfaces for a seamless user experience.",
      icon: Code,
    },
    {
      name: "Maya Patel",
      role: "Head of Growth & Marketing",
      description: "Drives brand awareness, user engagement, and global outreach.",
      icon: Target,
    },
    {
      name: "David Kim",
      role: "Lead Software Engineer",
      description: "Ensures the backend system runs smoothly with high performance and security.",
      icon: Cpu,
    },
  ];

  const timeline = [
    {
      date: "2024",
      title: "The Idea is Born",
      description: "The vision for an AI-powered audiobook generator was conceived.",
      icon: Calendar,
    },
    {
      date: "Q1 2025",
      title: "Product Development Begins",
      description: "Initial UI/UX design and core AI integrations with GPT-4 & ElevenLabs.",
      icon: Microscope,
    },
    {
      date: "Q2 2025",
      title: "MVP Launch",
      description: "Beta version released for early adopters.",
      icon: Hammer,
    },
    {
      date: "Q3 2025",
      title: "Official Public Launch",
      description: "Full-featured product release with premium voice options and customization.",
      icon: Rocket,
    },
    {
      date: "2026 & Beyond",
      title: "Expansion & Innovation",
      description: "Multilingual support, advanced AI voice emotions, and strategic partnerships with publishers.",
      icon: Globe2,
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {" "}Kolerr Technologies Inc
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An innovative AI company focused on revolutionizing audiobook generation
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                We believe that reading should be flexible and accessible. Whether you're a student,
                a busy professional, or an audiobook enthusiast, our technology enables you to
                listen to any text-based content effortlessly.
              </p>
            </Card>
            <Card className="p-6">
              <Headphones className="w-12 h-12 text-accent mb-4" />
              <h2 className="text-2xl font-bold mb-4">What Powers Our Technology</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-primary" />
                  GPT-4 by OpenAI for enhanced text processing
                </li>
                <li className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-primary" />
                  ElevenLabs AI Voices for premium voice synthesis
                </li>
                <li className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-primary" />
                  Kolerr's Smart AI Engine for optimal results
                </li>
              </ul>
            </Card>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="p-6">
                <member.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-accent mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Company Timeline</h2>
          <div className="space-y-8">
            {timeline.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index }}
                className="flex items-start gap-4"
              >
                <event.icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold">{event.date} - {event.title}</h3>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Vision Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Our Vision for the Future</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Multilingual Support</h3>
              <p className="text-muted-foreground">Supporting multiple languages for a global audience</p>
            </Card>
            <Card className="p-6">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Emotional AI Narration</h3>
              <p className="text-muted-foreground">AI that adapts tone and emotion based on content</p>
            </Card>
            <Card className="p-6">
              <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Strategic Partnerships</h3>
              <p className="text-muted-foreground">Direct integration with publishers and digital libraries</p>
            </Card>
          </div>
        </motion.section>
      </div>

      <Footer />
    </main>
  );
};

export default About;
