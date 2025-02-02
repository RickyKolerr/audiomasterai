import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import PaymentMethodSelector from "./PaymentMethodSelector"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface SubscriptionDialogProps {
  isOpen: boolean
  onClose: () => void
  planName: string
  planPrice: string
}

const SubscriptionDialog = ({
  isOpen,
  onClose,
  planName,
  planPrice,
}: SubscriptionDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async () => {
    setLoading(true)
    // Mock subscription process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast({
      title: "Subscription successful!",
      description: `You are now subscribed to the ${planName} plan.`,
    })
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black border border-green-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Subscribe to {planName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="text-sm text-gray-400">
            You selected the {planName} plan at {planPrice}/month
          </div>
          <PaymentMethodSelector
            selectedMethod={paymentMethod}
            onSelect={setPaymentMethod}
          />
          <Button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600"
          >
            {loading ? "Processing..." : "Confirm Subscription"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionDialog