import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  content: string;
  role: "assistant" | "user";
}

export const ChatMessage = ({ content, role }: ChatMessageProps) => {
  return (
    <div className={`flex items-start gap-2 ${role === "user" ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          role === "assistant"
            ? "bg-green-100 text-green-500"
            : "bg-blue-100 text-blue-500"
        }`}
      >
        {role === "assistant" ? (
          <Bot className="w-4 h-4" />
        ) : (
          <User className="w-4 h-4" />
        )}
      </div>
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          role === "assistant"
            ? "bg-gray-100 dark:bg-gray-800"
            : "bg-green-500 text-white"
        }`}
      >
        {content}
      </div>
    </div>
  );
};