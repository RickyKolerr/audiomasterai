import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/pricing/PricingCard";
import FeedbackPage from "@/components/feedback/FeedbackPage";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Main Features */}
      <section className="py-20 bg-background/50">
        <Features />
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Reading Experience?
          </h2>
          <Button 
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90"
          >
            Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background" id="pricing">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Perfect Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
            <Pricing />
          </div>
        </div>
      </section>

      {/* Testimonials and Feedback */}
      <section className="py-20 bg-accent/5">
        <FeedbackPage />
      </section>

      <Footer />
    </main>
  );
};

export default Index;