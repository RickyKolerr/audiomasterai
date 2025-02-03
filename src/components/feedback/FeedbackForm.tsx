import { useState } from "react"
import { Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { feedbackSchema } from "@/lib/validations/form-schemas"
import { useFormValidation } from "@/hooks/use-form-validation"

interface FeedbackFormData {
  rating: number
  message: string
}

const FeedbackForm = () => {
  const [rating, setRating] = useState<number>(0)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { errors, validate } = useFormValidation<FeedbackFormData>(feedbackSchema)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const formData = { rating, message }
    if (!validate(formData)) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      })
      
      setRating(0)
      setMessage("")
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-400"
                } hover:text-yellow-500 transition-colors`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-sm text-red-500">{errors.rating}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">
          Your Feedback
        </label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about your experience..."
          className={cn(
            "min-h-[100px] bg-black/50 border-gray-700",
            errors.message && "border-red-500 focus-visible:ring-red-500"
          )}
        />
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || rating === 0}
        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            Submit Feedback
            <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}

export default FeedbackForm