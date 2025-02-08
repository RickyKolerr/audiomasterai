import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Crown, Check, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const SubscriptionPlans = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: currentSubscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const plans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "3 conversions per month",
        "Basic voice options",
        "Standard quality audio",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      features: [
        "20 conversions per month",
        "Premium voice options",
        "High quality audio",
        "Priority support",
        "Download history"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29.99",
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

  const handleSubscribe = async (planName: string) => {
    setLoading(planName);
    try {
      // In a real implementation, this would integrate with Stripe
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please sign in to subscribe to a plan",
        });
        return;
      }

      const { error } = await supabase
        .from('subscriptions')
        .upsert({
          user_id: session.user.id,
          plan_id: planName.toLowerCase(),
          status: 'active',
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        });

      if (error) throw error;

      toast({
        title: "Subscription updated",
        description: `You are now subscribed to the ${planName} plan`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update subscription",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`p-6 ${
            plan.popular
              ? "border-green-500 relative overflow-hidden"
              : "border-gray-200"
          }`}
        >
          {plan.popular && (
            <div className="absolute top-4 right-4">
              <Crown className="h-6 w-6 text-green-500" />
            </div>
          )}
          <h3 className="text-2xl font-bold">{plan.name}</h3>
          <p className="text-3xl font-bold mt-4">{plan.price}</p>
          <p className="text-gray-500 mb-6">per month</p>
          <ul className="space-y-3 mb-6">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            className="w-full"
            onClick={() => handleSubscribe(plan.name)}
            disabled={loading === plan.name}
          >
            {loading === plan.name ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Subscribe to ${plan.name}`
            )}
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;