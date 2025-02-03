import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  role: "assistant" | "user";
  isLoading?: boolean;
}

export const ChatMessage = ({ content, role, isLoading }: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex items-start gap-2",
      role === "user" ? "flex-row-reverse" : ""
    )}>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          role === "assistant"
            ? "bg-green-100 text-green-500"
            : "bg-blue-100 text-blue-500"
        )}
      >
        {role === "assistant" ? (
          <Bot className="w-4 h-4" />
        ) : (
          <User className="w-4 h-4" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3",
          role === "assistant"
            ? "bg-gray-100 dark:bg-gray-800"
            : "bg-green-500 text-white"
        )}
      >
        {isLoading ? (
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        ) : (
          content
        )}
      </div>
    </div>
  );
};