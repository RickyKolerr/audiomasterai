
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ planName }),
        }
      );

      const { url, error } = await response.json();
      
      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              Price: <span className="text-white">${planPrice}/month</span>
            </div>
          </Card>
          
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
              "Proceed to Checkout"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDialog;
