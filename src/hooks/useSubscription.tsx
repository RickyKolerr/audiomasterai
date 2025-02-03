import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export type SubscriptionPlan = "free" | "pro" | "enterprise";

interface SubscriptionDetails {
  status: string | null;
  plan: SubscriptionPlan | null;
}

export const useSubscription = () => {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionDetails>({
    status: null,
    plan: null,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setLoading(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from("profiles")
          .select("subscription_status, subscription_plan")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;

        setSubscription({
          status: profile?.subscription_status || "inactive",
          plan: (profile?.subscription_plan as SubscriptionPlan) || "free",
        });
      } catch (error) {
        console.error("Error fetching subscription:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch subscription details",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [toast]);

  const checkAccess = (requiredPlan: SubscriptionPlan) => {
    const planLevels: Record<SubscriptionPlan, number> = {
      free: 0,
      pro: 1,
      enterprise: 2,
    };

    return planLevels[subscription.plan || "free"] >= planLevels[requiredPlan];
  };

  const redirectToUpgrade = () => {
    toast({
      title: "Upgrade Required",
      description: "This feature requires a higher subscription plan",
    });
    navigate("/pricing");
  };

  return {
    loading,
    subscription,
    checkAccess,
    redirectToUpgrade,
  };
};