import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SignInForm from "./SignInForm"
import SignUpForm from "./SignUpForm"
import ForgotPasswordForm from "./ForgotPasswordForm"

interface AuthDialogProps {
  isOpen: boolean
  onClose: () => void
}

const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const [activeTab, setActiveTab] = useState("signin")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black border border-green-500/20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-black/50">
            <TabsTrigger value="signin" className="data-[state=active]:bg-green-500">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-green-500">Sign Up</TabsTrigger>
          </TabsList>
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