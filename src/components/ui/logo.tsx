
import { Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Logo = ({ className, showText = true, size = "md" }: LogoProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-accent/20 blur-xl rounded-full animate-pulse" />
        <div className={cn(
          "relative transition-all duration-300 transform",
          isHovered ? "scale-110" : "scale-100"
        )}>
          <Headphones 
            className={cn(
              "text-primary transition-colors duration-300",
              sizes[size],
              isHovered && "text-accent"
            )}
            strokeWidth={2.5}
          />
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-500 to-accent opacity-30 blur-sm rounded-full" />
        </div>
      </div>
      {showText && (
        <div className={cn(
          "flex items-baseline gap-2 transition-all duration-300",
          isHovered && "translate-x-1"
        )}>
          <span className={cn(
            "font-bold bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent tracking-tight",
            textSizes[size]
          )}>
            Audiovable
          </span>
          {size !== "sm" && (
            <span className={cn(
              "text-sm transition-colors duration-300",
              isHovered ? "text-accent" : "text-gray-400"
            )}>
              AI
            </span>
          )}
        </div>
      )}
    </Link>
  );
};
