import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface SecuritySettingsProps {
  onSave: () => void
}

const SecuritySettings = ({ onSave }: SecuritySettingsProps) => {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <div className="space-y-0.5">
            <Label>Two-Factor Authentication</Label>
            <div className="text-sm text-gray-400">
              Add an extra layer of security to your account
            </div>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onCheckedChange={setTwoFactorEnabled}
          />
        </div>
      </div>

      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
        Update Security Settings
      </Button>
    </form>
  )
}

export default SecuritySettings