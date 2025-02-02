import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  onSelect: () => void
  loading?: boolean
}

const PricingCard = ({
  name,
  price,
  description,
  features,
  popular,
  onSelect,
  loading
}: PricingCardProps) => {
  return (
    <div
      className={cn(
        "relative p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40 transition-all duration-300 transform hover:-translate-y-1",
        popular && "scale-105 md:scale-110"
      )}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-white">{price}</span>
        {price !== "Free" && (
          <span className="text-gray-400 ml-2">/month</span>
        )}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Button
        onClick={onSelect}
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white group-hover:scale-105 transition-transform"
      >
        {loading ? "Processing..." : price === "Free" ? "Get Started" : "Subscribe Now"}
      </Button>
    </div>
  )
}

export default PricingCard