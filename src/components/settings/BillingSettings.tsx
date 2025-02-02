import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CreditCard, Download } from "lucide-react"

interface BillingSettingsProps {
  onSave: () => void
}

const BillingSettings = ({ onSave }: BillingSettingsProps) => {
  const handleUpdatePayment = () => {
    onSave()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Current Plan</Label>
          <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-green-500/20">
            <div>
              <div className="font-medium">Pro Plan</div>
              <div className="text-sm text-gray-400">$9.99/month</div>
            </div>
            <Button variant="outline" size="sm">
              Change Plan
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Payment Method</Label>
          <div className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-green-500/20">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div>
                <div className="font-medium">•••• •••• •••• 4242</div>
                <div className="text-sm text-gray-400">Expires 12/24</div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleUpdatePayment}>
              Update
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Billing History</Label>
          <div className="space-y-2">
            {[
              { date: "Mar 1, 2024", amount: "$9.99" },
              { date: "Feb 1, 2024", amount: "$9.99" },
              { date: "Jan 1, 2024", amount: "$9.99" },
            ].map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-black/30 border border-green-500/20"
              >
                <div>
                  <div className="font-medium">{invoice.date}</div>
                  <div className="text-sm text-gray-400">{invoice.amount}</div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingSettings