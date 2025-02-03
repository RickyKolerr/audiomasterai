import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { feedbackSchema } from "@/lib/validations/form-schemas"
import { useFormValidation } from "@/hooks/use-form-validation"
import { cn } from "@/lib/utils"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { supabase } from "@/integrations/supabase/client"

interface FeedbackFormData {
  rating: number
  message: string
}

export const FeedbackForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast()
  const {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm
  } = useFormValidation<FeedbackFormData>(
    { rating: 0, message: "" },
    feedbackSchema
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) throw new Error("User not authenticated")

      const { error } = await supabase
        .from('feedback')
        .insert({
          message: formData.message,
          rating: formData.rating,
          user_id: user.id
        })

      if (error) throw error

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      })
      resetForm()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label 
          htmlFor="rating" 
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              disabled={isSubmitting}
              onClick={() => handleChange("rating", value)}
              className={cn(
                "p-2 rounded-full transition-colors",
                formData.rating === value
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700",
                isSubmitting && "opacity-50 cursor-not-allowed"
              )}
            >
              {value}
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-sm text-red-500">{errors.rating}</p>
        )}
      </div>

      <div className="space-y-2">
        <label 
          htmlFor="message" 
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          disabled={isSubmitting}
          className={cn(
            errors.message && "border-red-500",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Submitting...
          </>
        ) : (
          "Submit Feedback"
        )}
      </Button>
    </form>
  )
}

export default FeedbackForm