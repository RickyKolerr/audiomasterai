import { useState } from "react";
import { 
  Book, 
  HelpCircle, 
  MessageSquare, 
  Headphones,
  Mail,
  FileQuestion,
  Upload,
  CreditCard,
  Settings,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const gettingStartedGuides = [
    {
      title: "Creating Your Account",
      icon: Book,
      content: "Learn how to create and set up your AudioMaster AI account. We'll guide you through the registration process and initial settings configuration."
    },
    {
      title: "Uploading Books",
      icon: Upload,
      content: "Discover how to upload your books and documents. We support various formats including PDF and EPUB files."
    },
    {
      title: "Generating Audiobooks",
      icon: Headphones,
      content: "Step-by-step guide on converting your books to audio using our AI technology. Learn about voice selection and customization options."
    }
  ];

  const troubleshootingGuides = [
    {
      title: "Audio Generation Issues",
      icon: AlertCircle,
      content: "Common solutions for failed audio generation, including format requirements and file size limits."
    },
    {
      title: "Upload Problems",
      icon: FileQuestion,
      content: "Troubleshoot file upload errors, supported formats, and size restrictions."
    },
    {
      title: "Payment & Billing",
      icon: CreditCard,
      content: "Resolve payment processing issues, subscription management, and billing inquiries."
    }
  ];

  const faqs = [
    {
      question: "What file formats are supported?",
      answer: "We currently support PDF and EPUB file formats for book uploads. Files must be less than 100MB in size."
    },
    {
      question: "How long does audio generation take?",
      answer: "Generation time varies based on book length and server load. Most books are processed within 30 minutes."
    },
    {
      question: "Can I customize the AI voice?",
      answer: "Yes! We offer multiple AI voices with adjustable speed, pitch, and tone. Premium users have access to additional voice options."
    },
    {
      question: "What are the storage limits?",
      answer: "Free users get 1GB storage. Premium users enjoy unlimited storage for their books and generated audio files."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. Access will continue until the end of your billing period."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How can we
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> help you?</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions and learn how to make the most of AudioMaster AI
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gettingStartedGuides.map((guide, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <guide.icon className="w-8 h-8 text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle>{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{guide.content}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Troubleshooting</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {troubleshootingGuides.map((guide, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <guide.icon className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                  <CardTitle>{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{guide.content}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Contact Support Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground">
              Our support team is here to help you with any questions or issues you may have.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenter;