import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}

export const ChatInput = ({ value, onChange, onSend, onKeyPress, disabled }: ChatInputProps) => {
  return (
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          placeholder={disabled ? "Please sign in to chat" : "Type your message..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={onKeyPress}
          className="flex-1"
          disabled={disabled}
        />
        <Button 
          onClick={onSend} 
          className="bg-green-500 hover:bg-green-600"
          disabled={disabled}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};