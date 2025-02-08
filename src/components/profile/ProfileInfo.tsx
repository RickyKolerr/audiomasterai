
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Camera } from "lucide-react"

type ProfileInfoProps = {
  profile: any
  formData: {
    firstName: string
    lastName: string
    username: string
  }
  isEditing: boolean
  handleInputChange: (field: string, value: string | boolean) => void
}

const ProfileInfo = ({ profile, formData, isEditing, handleInputChange }: ProfileInfoProps) => {
  return (
    <Card className="p-6 bg-black/50 border border-green-500/20">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
            <AvatarFallback>
              {profile?.username?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="space-x-2">
            <Camera className="h-4 w-4" />
            <span>Change Photo</span>
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              disabled={!isEditing}
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
              Your email is managed through your authentication provider
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ProfileInfo
