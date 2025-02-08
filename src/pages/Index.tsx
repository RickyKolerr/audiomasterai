
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingCard from "@/components/pricing/PricingCard";
import FeedbackPage from "@/components/feedback/FeedbackPage";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const plans = [
    {
      name: "Basic",
      price: "5",
      description: "Perfect for getting started",
      limits: {
        books: 3,
        materials: 5,
      },
      payPerUse: {
        book: 0.99,
        material: 0.99,
      },
      features: [
        { text: "Basic voice customization", included: true },
        { text: "Standard quality audio", included: true },
        { text: "Email support", included: true },
        { text: "Premium voices", included: false },
        { text: "Priority support", included: false }
      ]
    },
    {
      name: "Standard",
      price: "15",
      description: "Most popular choice",
      limits: {
        books: 10,
        materials: 15,
      },
      payPerUse: {
        book: 1.49,
        material: 1.49,
      },
      features: [
        { text: "Premium voice options", included: true },
        { text: "High quality audio", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "API access", included: false }
      ],
      popular: true
    },
    {
      name: "Pro",
      price: "30",
      description: "For power users",
      limits: {
        books: 30,
        materials: 50,
      },
      payPerUse: {
        book: 1.99,
        material: 1.99,
      },
      features: [
        { text: "All premium voices", included: true },
        { text: "Ultra-high quality audio", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "API access", included: true }
      ]
    }
  ];

  const handleSelectPlan = (planName: string) => {
    setLoadingPlan(planName);
    navigate("/pricing");
    setLoadingPlan(null);
  };

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
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                {...plan}
                onSelect={() => handleSelectPlan(plan.name)}
                loading={loadingPlan === plan.name}
              />
            ))}
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
