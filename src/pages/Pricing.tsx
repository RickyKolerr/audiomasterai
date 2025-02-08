
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import PricingCard from "@/components/pricing/PricingCard";
import SubscriptionDialog from "@/components/pricing/SubscriptionDialog";
import { supabase } from "@/integrations/supabase/client";

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<{
    name: string;
    price: string;
  } | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

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
        { text: "Priority support", included: false },
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
        { text: "API access", included: false },
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
        { text: "API access", included: true },
      ]
    },
    {
      name: "Enterprise",
      price: "100",
      description: "For businesses and teams",
      limits: {
        books: Infinity,
        materials: Infinity,
      },
      features: [
        { text: "Unlimited conversions", included: true },
        { text: "All premium voices", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Custom voice training", included: true },
        { text: "Dedicated account manager", included: true },
      ]
    }
  ];

  const handleSelectPlan = async (plan: { name: string; price: string }) => {
    setLoading(plan.name);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to subscribe to a plan",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedPlan(plan);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to process your request",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Simple, Transparent
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Pricing</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include our core features with different usage limits.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              onSelect={() => handleSelectPlan(plan)}
              loading={loading === plan.name}
            />
          ))}
        </div>
      </div>

      {selectedPlan && (
        <SubscriptionDialog
          isOpen={!!selectedPlan}
          onClose={() => setSelectedPlan(null)}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
      
      <Footer />
    </main>
  );
};

export default PricingPage;
