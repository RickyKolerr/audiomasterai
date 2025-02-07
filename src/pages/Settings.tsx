import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ProfileSettings from "@/components/settings/ProfileSettings"
import SecuritySettings from "@/components/settings/SecuritySettings"
import NotificationSettings from "@/components/settings/NotificationSettings"
import { useToast } from "@/hooks/use-toast"
import { useProfile } from "@/hooks/use-profile"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const { isLoading } = useProfile()
  const activeTab = searchParams.get("tab") || "profile"

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value })
  }

  const handleSettingsSave = () => {
    toast({
      title: "Settings updated",
      description: "Your settings have been saved successfully.",
    })
  }

  useEffect(() => {
    const validTabs = ["profile", "security", "notifications"]
    if (!validTabs.includes(activeTab)) {
      setSearchParams({ tab: "profile" })
    }
  }, [activeTab, setSearchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Account Settings</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="bg-black/50 border border-green-500/20">
            <TabsTrigger value="profile" className="data-[state=active]:bg-green-500">
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-green-500">
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-green-500">
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-black/50 border border-green-500/20 p-6">
              <ProfileSettings />
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-black/50 border border-green-500/20 p-6">
              <SecuritySettings onSave={handleSettingsSave} />
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="bg-black/50 border border-green-500/20 p-6">
              <NotificationSettings onSave={handleSettingsSave} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Settings