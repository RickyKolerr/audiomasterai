import { Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, showText = true, size = "md" }: LogoProps) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center space-x-2 group",
        className
      )}
    >
      <div className="relative">
        <Headphones 
          className={cn(
            "text-primary group-hover:scale-110 transition-transform duration-300",
            sizes[size]
          )} 
        />
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
      </div>
      {showText && (
        <div className="flex items-baseline gap-2">
          <span className={cn(
            "font-bold bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent",
            textSizes[size]
          )}>
            Audiovable
          </span>
          {size !== "sm" && (
            <span className="text-sm text-gray-400">by Kolerr Technologies</span>
          )}
        </div>
      )}
    </Link>
  );
};