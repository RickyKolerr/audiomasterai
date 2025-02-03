import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Facebook } from "lucide-react"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
import ForgotPasswordForm from "./ForgotPasswordForm"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface AuthDialogProps {
  isOpen: boolean
  onClose: () => void
}

const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState("signin")
  const { toast } = useToast()

  const handleFacebookLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      
      if (error) throw error
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Facebook. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black border border-green-500/20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/50">
            <TabsTrigger value="signin" className="data-[state=active]:bg-green-500">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-green-500">Sign Up</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 mb-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white border-none"
              onClick={handleFacebookLogin}
            >
              <Facebook className="w-5 h-5" />
              Continue with Facebook
            </Button>
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <TabsContent value="signin">
            <SignInForm onForgotPassword={() => setActiveTab("forgot-password")} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm />
          </TabsContent>
          <TabsContent value="forgot-password">
            <ForgotPasswordForm onBackToSignIn={() => setActiveTab("signin")} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default AuthDialog