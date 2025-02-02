import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const PricingPage = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePayment = async (planName: string, price: string) => {
    setLoading(planName);
    
    // Mock API call - replace with real Stripe/payment integration later
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Payment Initiated",
      description: `Redirecting to payment for ${planName} plan (${price})`,
    });
    
    setLoading(null);
  };

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
      ],
      color: "green",
      buttonText: "Start Free",
      period: null
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Most popular choice",
      features: [
        "Convert up to 20 books per month",
        "Premium voice options",
        "High quality audio",
        "Priority support",
        "Offline access"
      ],
      color: "blue",
      buttonText: "Subscribe with Stripe",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29.99",
      period: "per month",
      description: "For power users",
      features: [
        "Unlimited conversions",
        "All premium voices",
        "Ultra-high quality audio",
        "24/7 priority support",
        "API access",
        "Custom voice training"
      ],
      color: "pink",
      buttonText: "Contact Sales"
    }
  ];

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
            <div
              key={index}
              className={`relative p-8 rounded-xl bg-gradient-to-br from-${plan.color}-500/10 to-transparent border border-${plan.color}-500/20 hover:border-${plan.color}-500/40 transition-all duration-300 transform hover:-translate-y-1 group ${plan.popular ? 'scale-105 md:scale-110' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                )}
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full bg-${plan.color}-500 hover:bg-${plan.color}-600 text-white group-hover:scale-105 transition-transform`}
                onClick={() => handlePayment(plan.name, plan.price)}
                disabled={loading === plan.name}
              >
                {loading === plan.name ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Payment Methods We Accept</h2>
          <div className="flex justify-center items-center gap-8">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
              <span>Credit Card</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm1 19h-2v-2h2v2zm0-4h-2V5h2v10z"/>
              </svg>
              <span>PayPal</span>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto text-center text-gray-400">
          <p className="mb-4">
            All payments are processed securely through Stripe. We never store your card details.
          </p>
          <p>
            Questions about our pricing? <button className="text-blue-500 hover:underline">Contact our sales team</button>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PricingPage;