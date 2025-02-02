import { useState } from "react"
import { Bell, MessageCircle, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const NotificationPreferences = () => {
  const { toast } = useToast()
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    projectUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    soundEffects: true
  })

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleSave = () => {
    // This will be connected to the backend later
    toast({
      title: "Preferences Updated",
      description: "Your notification preferences have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/50 border border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="h-5 w-5 text-green-500" />
            Notification Channels
          </CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-400">
                Receive notifications via email
              </p>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={() => handleToggle('emailNotifications')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-gray-400">
                Receive notifications on your desktop
              </p>
            </div>
            <Switch
              checked={preferences.pushNotifications}
              onCheckedChange={() => handleToggle('pushNotifications')}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/50 border border-green-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-500" />
            Notification Types
          </CardTitle>
          <CardDescription>
            Select the types of notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Project Updates</Label>
              <p className="text-sm text-gray-400">
                Get notified about your project status changes
              </p>
            </div>
            <Switch
              checked={preferences.projectUpdates}
              onCheckedChange={() => handleToggle('projectUpdates')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Security Alerts</Label>
              <p className="text-sm text-gray-400">
                Receive important security notifications
              </p>
            </div>
            <Switch
              checked={preferences.securityAlerts}
              onCheckedChange={() => handleToggle('securityAlerts')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-gray-400">
                Receive updates about new features and offers
              </p>
            </div>
            <Switch
              checked={preferences.marketingEmails}
              onCheckedChange={() => handleToggle('marketingEmails')}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sound Effects</Label>
              <p className="text-sm text-gray-400">
                Play sounds for important notifications
              </p>
            </div>
            <Switch
              checked={preferences.soundEffects}
              onCheckedChange={() => handleToggle('soundEffects')}
            />
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSave}
        className="w-full bg-green-500 hover:bg-green-600"
      >
        Save Preferences
      </Button>
    </div>
  )
}

export default NotificationPreferences