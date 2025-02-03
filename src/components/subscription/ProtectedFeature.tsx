import { ReactNode } from "react";
import { useSubscription, SubscriptionPlan } from "@/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface ProtectedFeatureProps {
  children: ReactNode;
  requiredPlan: SubscriptionPlan;
  featureName: string;
}

const ProtectedFeature = ({ children, requiredPlan, featureName }: ProtectedFeatureProps) => {
  const { loading, checkAccess, redirectToUpgrade } = useSubscription();

  if (loading) {
    return <div className="animate-pulse bg-gray-800/50 rounded-lg p-4">Loading...</div>;
  }

  if (!checkAccess(requiredPlan)) {
    return (
      <div className="border border-gray-800 rounded-lg p-6 text-center space-y-4">
        <Lock className="w-12 h-12 mx-auto text-gray-500" />
        <h3 className="text-lg font-semibold">{featureName}</h3>
        <p className="text-gray-400">
          This feature requires the {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} plan
        </p>
        <Button onClick={redirectToUpgrade} className="bg-green-500 hover:bg-green-600">
          Upgrade Now
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedFeature;