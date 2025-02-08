import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Mail, Facebook } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"signin" | "signup" | "forgot-password">("signin");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign in with Facebook. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex items-center justify-center p-4">
      <Card className="w-full max-w-md space-y-8 p-8 animate-fade-in bg-black/50 border-green-500/20">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Headphones className="w-12 h-12 text-green-500 animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
            Audiovable
          </h2>
          <p className="mt-2 text-muted-foreground">
            {activeTab === "signin" 
              ? "Welcome back! Sign in to your account" 
              : activeTab === "signup" 
                ? "Create your account to get started" 
                : "Reset your password"}
          </p>
        </div>

        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-colors"
          onClick={handleFacebookLogin}
          disabled={isLoading}
        >
          <Facebook className="w-5 h-5" />
          Continue with Facebook
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value: "signin" | "signup" | "forgot-password") => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
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
      </Card>
    </div>
  );
};

export default Auth;