import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, User, Bell, Lock } from "lucide-react"
import ProfileSetup from "./steps/ProfileSetup"
import NotificationPreferences from "./steps/NotificationPreferences"
import SecuritySetup from "./steps/SecuritySetup"

interface OnboardingFlowProps {
  isOpen: boolean
  onComplete: () => void
}

const OnboardingFlow = ({ isOpen, onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = ["Profile Setup", "Notifications", "Security"]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 0:
        return <User className="w-5 h-5" />
      case 1:
        return <Bell className="w-5 h-5" />
      case 2:
        return <Lock className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px] bg-black border border-green-500/20">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Welcome to AudioMaster AI</h2>
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="bg-gray-700" />
          </div>

          <div className="flex items-center space-x-8 mb-6">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center space-x-2 ${
                  index <= currentStep ? "text-green-500" : "text-gray-400"
                }`}
              >
                {getStepIcon(index)}
                <span className="text-sm">{step}</span>
              </div>
            ))}
          </div>

          <div className="min-h-[400px]">
            {currentStep === 0 && <ProfileSetup />}
            {currentStep === 1 && <NotificationPreferences />}
            {currentStep === 2 && <SecuritySetup />}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="border-green-500/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} className="bg-green-500 hover:bg-green-600">
              {currentStep === steps.length - 1 ? (
                "Complete Setup"
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OnboardingFlow