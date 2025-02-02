import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingPage = () => {
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
      color: "green"
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
      color: "pink"
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
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PricingPage;