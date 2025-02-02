import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

interface ProfileSettingsProps {
  onSave: () => void
}

const ProfileSettings = ({ onSave }: ProfileSettingsProps) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="space-x-2">
            <Camera className="h-4 w-4" />
            <span>Change Photo</span>
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
        Save Changes
      </Button>
    </form>
  )
}

export default ProfileSettings