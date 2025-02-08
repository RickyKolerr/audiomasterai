
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { signInSchema } from "@/lib/validations/form-schemas"
import { useFormValidation } from "@/hooks/use-form-validation"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { supabase } from "@/integrations/supabase/client"
import ReCAPTCHA from "react-google-recaptcha"

interface SignInFormProps {
  onForgotPassword: () => void;
}

interface SignInFormData {
  email: string
  password: string
}

export const SignInForm = ({ onForgotPassword }: SignInFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const { toast } = useToast()
  const {
    formData,
    errors,
    handleChange,
    validateForm,
  } = useFormValidation<SignInFormData>(
    { email: "", password: "" },
    signInSchema
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    if (!captchaToken) {
      toast({
        title: "Error",
        description: "Please complete the CAPTCHA verification",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
        options: {
          captchaToken
        }
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "You have been signed in successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={isSubmitting}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          disabled={isSubmitting}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <div className="flex justify-center my-4">
        <ReCAPTCHA
          sitekey="YOUR_RECAPTCHA_SITE_KEY"
          onChange={(token) => setCaptchaToken(token)}
        />
      </div>

      <Button 
        type="button"
        variant="link"
        onClick={onForgotPassword}
        className="px-0 text-green-500 hover:text-green-400"
      >
        Forgot password?
      </Button>

      <Button 
        type="submit" 
        disabled={isSubmitting || !captchaToken}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  )
}

export default SignInForm
