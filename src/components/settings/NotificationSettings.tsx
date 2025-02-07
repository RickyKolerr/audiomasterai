import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface NotificationSettingsProps {
  onSave: () => void
}

const NotificationSettings = ({ onSave }: NotificationSettingsProps) => {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [securityAlerts, setSecurityAlerts] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <div className="text-sm text-gray-400">
              Receive notifications about your account activity
            </div>
          </div>
          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Push Notifications</Label>
            <div className="text-sm text-gray-400">
              Receive notifications on your desktop
            </div>
          </div>
          <Switch
            checked={pushNotifications}
            onCheckedChange={setPushNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Marketing Emails</Label>
            <div className="text-sm text-gray-400">
              Receive emails about new features and offers
            </div>
          </div>
          <Switch
            checked={marketingEmails}
            onCheckedChange={setMarketingEmails}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Security Alerts</Label>
            <div className="text-sm text-gray-400">
              Get notified about security updates
            </div>
          </div>
          <Switch
            checked={securityAlerts}
            onCheckedChange={setSecurityAlerts}
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
        Save Notification Preferences
      </Button>
    </form>
  )
}

export default NotificationSettings