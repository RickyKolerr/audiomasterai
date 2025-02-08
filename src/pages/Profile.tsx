
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Save, X } from "lucide-react"
import { useProfile } from "@/hooks/use-profile"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import ProfileInfo from "@/components/profile/ProfileInfo"
import SecurityNotifications from "@/components/profile/SecurityNotifications"
import SubscriptionPayment from "@/components/profile/SubscriptionPayment"

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
          <ProfileInfo
            profile={profile}
            formData={formData}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />
          
          <SecurityNotifications
            formData={formData}
            isEditing={isEditing}
            handleInputChange={handleInputChange}
          />
          
          <SubscriptionPayment
            profile={profile}
            formData={formData}
            handleInputChange={handleInputChange}
          />
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
