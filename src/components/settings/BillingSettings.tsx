import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreditCard, Download, Loader2 } from "lucide-react";
import { PaymentMethodSelector } from "@/components/PaymentMethodSelector";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface BillingSettingsProps {
  onSave: () => void;
}

const BillingSettings = ({ onSave }: BillingSettingsProps) => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { toast } = useToast();

  const handleUpdatePayment = async () => {
    setLoading(true);
    // Mock API call - replace with real API call later
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast({
      title: "Payment method updated",
      description: "Your payment method has been successfully updated.",
    });
    setLoading(false);
    onSave();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Current Plan</Label>
          <Card className="flex items-center justify-between p-4 bg-black/30 border-green-500/20">
            <div>
              <div className="font-medium">Pro Plan</div>
              <div className="text-sm text-gray-400">$9.99/month</div>
            </div>
            <Button variant="outline" size="sm">
              Change Plan
            </Button>
          </Card>
        </div>

        <div className="space-y-2">
          <Label>Payment Method</Label>
          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            onSelect={setPaymentMethod}
          />
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleUpdatePayment}
            disabled={loading}
            className="mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Payment Method"
            )}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Billing History</Label>
          <div className="space-y-2">
            {[
              { date: "Mar 1, 2024", amount: "$9.99" },
              { date: "Feb 1, 2024", amount: "$9.99" },
              { date: "Jan 1, 2024", amount: "$9.99" },
            ].map((invoice, index) => (
              <Card
                key={index}
                className="flex items-center justify-between p-4 bg-black/30 border-green-500/20"
              >
                <div>
                  <div className="font-medium">{invoice.date}</div>
                  <div className="text-sm text-gray-400">{invoice.amount}</div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;