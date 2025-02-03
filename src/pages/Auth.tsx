import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Headphones, Loader2, Mail } from "lucide-react"
import { z } from "zod"

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate()
  const { toast } = useToast()

  const validateForm = () => {
    try {
      authSchema.parse({ email, password })
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = {}
        error.errors.forEach((err) => {
          formattedErrors[err.path[0]] = err.message
        })
        setErrors(formattedErrors)
      }
      return false
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } else {
      toast({
        title: "Success!",
        description: "Please check your email to confirm your account.",
      })
    }
    setLoading(false)
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } else {
      toast({
        title: "Welcome back!",
        description: "Successfully signed in.",
      })
      navigate("/dashboard")
    }
    setLoading(false)
  }

  const handleResetPassword = async () => {
    if (!email) {
      setErrors({ email: "Please enter your email address" })
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    } else {
      toast({
        title: "Check your email",
        description: "We've sent you a password reset link.",
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Headphones className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
            Audiovable
          </h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account or create a new one
          </p>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <Button
                type="button"
                variant="link"
                onClick={handleResetPassword}
                className="px-0 text-green-500 hover:text-green-400"
              >
                Forgot password?
              </Button>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Auth