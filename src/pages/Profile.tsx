import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Camera, Save, X, Lock, CreditCard } from "lucide-react"
import { useProfile } from "@/hooks/use-profile"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Separator } from "@/components/ui/separator"
import { PaymentMethodSelector } from "@/components/PaymentMethodSelector"

const Profile = () => {
  const { profile, isLoading, updateProfile } = useProfile()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    paymentMethod: "card"
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      await updateProfile.mutateAsync({
        username: formData.username,
      })
      setIsEditing(false)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setFormData({
      ...formData,
      username: profile?.username || "",
    })
  }

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
        <h1 className="text-3xl font-bold text-white mb-8">My Profile</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Info */}
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

          {/* Security & Notifications */}
          <Card className="p-6 bg-black/50 border border-green-500/20">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-500" />
                  Security
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange("newPassword", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-400">
                      Receive updates and notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={formData.emailNotifications}
                    onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Subscription & Payment */}
          <Card className="p-6 bg-black/50 border border-green-500/20 md:col-span-2">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                Subscription & Payment
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Current Plan</Label>
                  <Card className="p-4 bg-black/30 border-green-500/20">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{profile?.subscription_plan || "Free"}</p>
                        <p className="text-sm text-gray-400">
                          {profile?.subscription_status === "active" ? "Active" : "Inactive"}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Upgrade
                      </Button>
                    </div>
                  </Card>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <PaymentMethodSelector
                    selectedMethod={formData.paymentMethod}
                    onSelect={(method) => handleInputChange("paymentMethod", method)}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              <Button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 space-x-2"
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? (
                  <LoadingSpinner className="h-4 w-4" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>Save Changes</span>
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile