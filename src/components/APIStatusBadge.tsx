import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface APIStatusBadgeProps {
  name: string;
  isLoading: boolean;
  isError?: boolean;
}

export const APIStatusBadge = ({ name, isLoading, isError }: APIStatusBadgeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge 
            variant={isError ? "destructive" : "default"}
            className="ml-2"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              name
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isLoading ? "Checking API status..." : isError ? "API Error" : "API Connected"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};