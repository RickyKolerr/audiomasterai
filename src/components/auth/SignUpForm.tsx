import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Facebook } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const SignUpForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock sign up
    toast({
      title: "Account created!",
      description: "Welcome to AudioMaster AI",
    })
  }

  const handleFacebookSignUp = () => {
    // Mock Facebook sign up
    toast({
      title: "Facebook sign up",
      description: "Facebook authentication will be implemented later",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
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
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
        Create Account
      </Button>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black px-2 text-gray-400">Or continue with</span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        onClick={handleFacebookSignUp}
        className="w-full border-blue-600 text-blue-600 hover:bg-blue-600/10"
      >
        <Facebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
    </form>
  )
}

export default SignUpForm