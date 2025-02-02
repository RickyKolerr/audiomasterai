import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
  })

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Notifications</Label>
            <div className="text-sm text-gray-400">
              Receive notifications about your account activity
            </div>
          </div>
          <Switch
            checked={preferences.emailNotifications}
            onCheckedChange={() => handleToggle('emailNotifications')}
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
            checked={preferences.pushNotifications}
            onCheckedChange={() => handleToggle('pushNotifications')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Project Updates</Label>
            <div className="text-sm text-gray-400">
              Get notified about your project status changes
            </div>
          </div>
          <Switch
            checked={preferences.projectUpdates}
            onCheckedChange={() => handleToggle('projectUpdates')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Security Alerts</Label>
            <div className="text-sm text-gray-400">
              Receive important security notifications
            </div>
          </div>
          <Switch
            checked={preferences.securityAlerts}
            onCheckedChange={() => handleToggle('securityAlerts')}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Marketing Emails</Label>
            <div className="text-sm text-gray-400">
              Receive updates about new features and offers
            </div>
          </div>
          <Switch
            checked={preferences.marketingEmails}
            onCheckedChange={() => handleToggle('marketingEmails')}
          />
        </div>
      </div>
    </div>
  )
}

export default NotificationPreferences