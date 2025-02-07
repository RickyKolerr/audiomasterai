import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  limits?: {
    books: number;
    materials: number;
  };
  payPerUse?: {
    book: number;
    material: number;
  };
  popular?: boolean;
  onSelect: () => void;
  loading?: boolean;
}

const PricingCard = ({
  name,
  price,
  description,
  features,
  limits,
  payPerUse,
  popular,
  onSelect,
  loading,
}: PricingCardProps) => {
  return (
    <Card
      className={cn(
        "relative p-8 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40 transition-all duration-300 transform hover:-translate-y-1",
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
        <span className="text-4xl font-bold text-white">${price}</span>
        <span className="text-gray-400 ml-2">/month</span>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      
      {limits && (
        <div className="mb-6 space-y-2">
          <Badge variant="outline" className="w-full justify-between">
            <span>Books</span>
            <span>{limits.books === Infinity ? "Unlimited" : limits.books}</span>
          </Badge>
          <Badge variant="outline" className="w-full justify-between">
            <span>Study Materials</span>
            <span>{limits.materials === Infinity ? "Unlimited" : limits.materials}</span>
          </Badge>
        </div>
      )}

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <Check className={cn(
              "w-5 h-5 mr-2 flex-shrink-0",
              feature.included ? "text-green-500" : "text-gray-500"
            )} />
            <span className={cn(!feature.included && "text-gray-500")}>{feature.text}</span>
          </li>
        ))}
      </ul>

      {payPerUse && (
        <div className="mb-6 p-4 bg-black/20 rounded-lg">
          <p className="text-sm font-medium text-gray-300 mb-2">Pay-per-use rates:</p>
          <div className="space-y-1 text-sm text-gray-400">
            <p>Book: ${payPerUse.book.toFixed(2)}/conversion</p>
            <p>Study Material: ${payPerUse.material.toFixed(2)}/conversion</p>
          </div>
        </div>
      )}

      <Button
        onClick={onSelect}
        disabled={loading}
        className="w-full bg-green-500 hover:bg-green-600 text-white group-hover:scale-105 transition-transform"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Subscribe Now"
        )}
      </Button>
    </Card>
  );
};

export default PricingCard;