
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"
import { PaymentMethodSelector } from "@/components/PaymentMethodSelector"

type SubscriptionPaymentProps = {
  profile: any
  formData: {
    paymentMethod: string
  }
  handleInputChange: (field: string, value: string) => void
}

const SubscriptionPayment = ({ profile, formData, handleInputChange }: SubscriptionPaymentProps) => {
  return (
    <Card className="p-6 bg-black/50 border border-green-500/20 md:col-span-2">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-green-500" />
          Subscription & Payment
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Current Plan</Label>
            <Card className="p-4 bg-black/30 border-green-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{profile?.subscription_plan || "Free"}</p>
                  <p className="text-sm text-gray-400">
                    {profile?.subscription_status === "active" ? "Active" : "Inactive"}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Upgrade
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-2">
            <Label>Payment Method</Label>
            <PaymentMethodSelector
              selectedMethod={formData.paymentMethod}
              onSelect={(method) => handleInputChange("paymentMethod", method)}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default SubscriptionPayment
