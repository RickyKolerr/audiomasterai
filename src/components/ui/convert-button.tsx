import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ConvertButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
  onClick?: () => void;
}

export const ConvertButton = ({
  variant = "default",
  size = "lg",
  className,
  onClick,
}: ConvertButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: navigate to conversion section or features page
      navigate("/features#conversion-section");
    }
  };

  return (
    <Button
      size={size}
      variant={variant}
      onClick={handleClick}
      className={cn(
        "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 group transition-all duration-300",
        className
      )}
    >
      <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
      Convert Book Now
    </Button>
  );
};