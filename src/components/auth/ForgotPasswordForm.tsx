import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ForgotPasswordFormProps {
  onBackToSignIn: () => void
}

const ForgotPasswordForm = ({ onBackToSignIn }: ForgotPasswordFormProps) => {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock password reset
    toast({
      title: "Reset link sent!",
      description: "Check your email for password reset instructions",
    })
    onBackToSignIn()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <Button
        type="button"
        variant="ghost"
        onClick={onBackToSignIn}
        className="mb-2 pl-0 text-green-500 hover:text-green-400"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Sign In
      </Button>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
        Send Reset Link
      </Button>
    </form>
  )
}

export default ForgotPasswordForm