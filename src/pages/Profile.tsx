import { useProfile } from "@/hooks/use-profile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Camera, User } from "lucide-react"

const Profile = () => {
  const { profile, isLoading, updateProfile } = useProfile()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>
        
        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Profile Card */}
          <Card className="bg-black/50 border border-green-500/20 h-fit">
            <CardHeader className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="space-x-2">
                  <Camera className="h-4 w-4" />
                  <span>Change Photo</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-center">
                <h2 className="text-xl font-semibold text-white">{profile?.username || "Username not set"}</h2>
                <p className="text-sm text-gray-400">Member since {new Date(profile?.created_at || "").toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="bg-black/50 border border-green-500/20">
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  defaultValue={profile?.username || ""}
                  placeholder="Enter your username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile?.id}
                  disabled
                  className="bg-gray-100"
                />
                <p className="text-sm text-gray-500">
                  Your email is managed through your authentication provider.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  className="min-h-[100px]"
                />
              </div>

              <Button className="w-full bg-green-500 hover:bg-green-600">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile