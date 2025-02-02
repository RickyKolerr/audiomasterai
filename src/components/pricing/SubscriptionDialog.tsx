import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PaymentMethodSelector } from "@/components/PaymentMethodSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface SubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
}

const SubscriptionDialog = ({
  isOpen,
  onClose,
  planName,
  planPrice,
}: SubscriptionDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setLoading(true);
    // Mock subscription process - replace with real API call later
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast({
      title: "Subscription successful!",
      description: `You are now subscribed to the ${planName} plan.`,
    });
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black border border-green-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Subscribe to {planName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <Card className="p-4 bg-black/50 border-green-500/20">
            <div className="text-sm text-gray-400">
              Selected Plan: <span className="text-white">{planName}</span>
            </div>
            <div className="text-sm text-gray-400">
              Price: <span className="text-white">{planPrice}/month</span>
            </div>
          </Card>
          
          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            onSelect={setPaymentMethod}
          />
          
          <Button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Subscription"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;