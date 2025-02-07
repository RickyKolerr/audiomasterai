import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"
import { useProfile } from "@/hooks/use-profile"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const ProfileSettings = () => {
  const { profile, isLoading, updateProfile } = useProfile()
  const [username, setUsername] = useState(profile?.username || "")
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile.mutate({
      username,
      avatar_url: avatarUrl,
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl || "/placeholder.svg"} />
            <AvatarFallback>{username?.charAt(0)?.toUpperCase() || "U"}</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="space-x-2">
            <Camera className="h-4 w-4" />
            <span>Change Photo</span>
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profile?.id || ""}
            disabled
            className="bg-gray-100"
          />
          <p className="text-sm text-gray-500">
            Your email is managed through your authentication provider.
          </p>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-green-500 hover:bg-green-600"
        disabled={updateProfile.isPending}
      >
        {updateProfile.isPending ? (
          <LoadingSpinner className="mr-2 h-4 w-4" />
        ) : null}
        Save Changes
      </Button>
    </form>
  )
}