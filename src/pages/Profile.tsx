import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Settings, Book, Download } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "@/hooks/use-profile"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const Profile = () => {
  const navigate = useNavigate()
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="p-6 bg-black/50 border border-green-500/20">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback>
                  {profile?.username?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold text-white">
                  {profile?.username || "Anonymous User"}
                </h2>
                <p className="text-sm text-gray-400">{profile?.id}</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </Card>

          {/* Subscription Status */}
          <Card className="p-6 bg-black/50 border border-green-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">
              Subscription Status
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Current Plan</p>
                <p className="text-white font-medium">
                  {profile?.subscription_plan || "Free"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="text-white font-medium">
                  {profile?.subscription_status || "Active"}
                </p>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600">
                Upgrade Plan
              </Button>
            </div>
          </Card>

          {/* Usage Statistics */}
          <Card className="p-6 bg-black/50 border border-green-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">
              Usage Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Book className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-400">Books Converted</span>
                </div>
                <span className="text-white font-medium">0</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Download className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-400">Downloads</span>
                </div>
                <span className="text-white font-medium">0</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile