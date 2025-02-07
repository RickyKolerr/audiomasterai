import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import NotificationSettings from "@/components/settings/NotificationSettings"
import SecuritySettings from "@/components/settings/SecuritySettings"
import { useToast } from "@/hooks/use-toast"
import { Bell, Lock, Settings as SettingsIcon } from "lucide-react"

const Settings = () => {
  const { toast } = useToast()

  const handleSettingsSave = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
        
        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList className="bg-black/50 border border-green-500/20">
            <TabsTrigger value="notifications" className="data-[state=active]:bg-green-500">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-green-500">
              <Lock className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-green-500">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <Card className="bg-black/50 border border-green-500/20 p-6">
              <NotificationSettings onSave={handleSettingsSave} />
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-black/50 border border-green-500/20 p-6">
              <SecuritySettings onSave={handleSettingsSave} />
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="bg-black/50 border border-green-500/20 p-6">
              <div className="text-gray-400 text-center py-8">
                Preferences settings coming soon...
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Settings