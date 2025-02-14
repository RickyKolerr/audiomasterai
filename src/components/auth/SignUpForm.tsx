import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { useToast } from "@/hooks/use-toast"
import { signUpSchema } from "@/lib/validations/form-schemas"
import { useFormValidation } from "@/hooks/use-form-validation"
import { supabase } from "@/integrations/supabase/client"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
}

export const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const {
    formData,
    errors,
    handleChange,
    validateForm
  } = useFormValidation<SignUpFormData>(
    { email: "", password: "", confirmPassword: "" },
    signUpSchema
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Please check your email to verify your account.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign up. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="Email"
        type="email"
        id="email"
        value={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
        error={errors.email}
        disabled={isSubmitting}
      />
      <FormField
        label="Password"
        type="password"
        id="password"
        value={formData.password}
        onChange={(e) => handleChange("password", e.target.value)}
        error={errors.password}
        disabled={isSubmitting}
      />
      <FormField
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={(e) => handleChange("confirmPassword", e.target.value)}
        error={errors.confirmPassword}
        disabled={isSubmitting}
      />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Signing up...
          </>
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  )
}

export default SignUpForm