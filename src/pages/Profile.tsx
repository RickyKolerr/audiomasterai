import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useProfile } from "@/hooks/use-profile"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Camera, Settings } from "lucide-react"
import { Link } from "react-router-dom"

const Profile = () => {
  const { profile, isLoading } = useProfile()

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <Link to="/settings">
            <Button variant="outline" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>
        </div>

        <Card className="bg-black/50 border border-green-500/20 p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback>{profile?.username?.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
              </Avatar>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute bottom-0 right-0 rounded-full bg-black/50 backdrop-blur-sm"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change avatar</span>
              </Button>
            </div>

            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-white">{profile?.username || 'Anonymous'}</h2>
              <p className="text-gray-400">{profile?.id}</p>
            </div>

            <div className="w-full max-w-md space-y-4 mt-8">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Subscription</h3>
                <p className="text-gray-400">
                  {profile?.subscription_status === 'active' 
                    ? `Active - ${profile?.subscription_plan}` 
                    : 'No active subscription'}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Usage</h3>
                <p className="text-gray-400">
                  {profile?.monthly_conversions_used || 0} conversions this month
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Profile