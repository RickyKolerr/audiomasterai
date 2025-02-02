import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const SecuritySetup = () => {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
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
    </div>
  )
}

export default SecuritySetup