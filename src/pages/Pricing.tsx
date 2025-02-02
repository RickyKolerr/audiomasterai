import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PricingCard from "@/components/pricing/PricingCard";
import SubscriptionDialog from "@/components/pricing/SubscriptionDialog";

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
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Convert up to 3 books per month",
        "Basic voice options",
        "Standard quality audio",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      description: "Most popular choice",
      features: [
        "Convert up to 20 books per month",
        "Premium voice options",
        "High quality audio",
        "Priority support",
        "Offline access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29.99",
      description: "For power users",
      features: [
        "Unlimited conversions",
        "All premium voices",
        "Ultra-high quality audio",
        "24/7 priority support",
        "API access",
        "Custom voice training"
      ]
    }
  ];

  const handleSelectPlan = (plan: { name: string; price: string }) => {
    setSelectedPlan(plan);
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
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              onSelect={() => handleSelectPlan(plan)}
              loading={loading === plan.name}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Secure Payment Methods</h2>
          <div className="flex justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="rounded-lg bg-black/30 p-3 border border-green-500/20">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                </svg>
              </div>
              <span>Credit Card</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <div className="rounded-lg bg-black/30 p-3 border border-green-500/20">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 19h-2v-2h2v2zm0-4h-2V5h2v10z"/>
                </svg>
              </div>
              <span>PayPal</span>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto text-center text-gray-400">
          <p className="mb-4">
            All payments are processed securely through Stripe. We never store your card details.
          </p>
          <p>
            Questions about our pricing? <button className="text-green-500 hover:text-green-400 transition-colors">Contact our sales team</button>
          </p>
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