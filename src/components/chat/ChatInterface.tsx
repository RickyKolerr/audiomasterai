import { useState, useRef, useEffect } from "react";
import { MessageCircle, Minimize2, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  content: string;
  role: "assistant" | "user";
  timestamp: Date;
}

export const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // Store the user message in Supabase
      const { error: insertError } = await supabase
        .from('chatbot_conversations')
        .insert({
          message: input,
          response: '', // Will be updated after AI responds
          user_id: (await supabase.auth.getUser()).data.user?.id,
        });

      if (insertError) throw insertError;

      const { data, error } = await supabase.functions.invoke('chat-with-gpt', {
        body: {
          messages: [
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            { role: 'user', content: input }
          ]
        }
      });

      if (error) throw error;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
      };

      // Update the conversation with AI response
      const { error: updateError } = await supabase
        .from('chatbot_conversations')
        .update({ 
          response: data.message,
          resolved: true 
        })
        .eq('message', input)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

      if (updateError) throw updateError;

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get response from AI assistant. Please try again.",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg group"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="bg-background rounded-lg shadow-xl w-[380px] h-[600px] flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 border-b flex items-center justify-between bg-green-500 text-white rounded-t-lg"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <h3 className="font-semibold">AudioMaster Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-600 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-600 text-white"
                  onClick={() => {
                    setIsOpen(false);
                    setMessages([]);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>

            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-4">
                    <p>👋 Hi! I'm your AudioMaster Assistant.</p>
                    <p className="mt-2">How can I help you today?</p>
                  </div>
                )}
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ChatMessage
                      content={message.content}
                      role={message.role}
                    />
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex gap-1">
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 1, 0.4]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            times: [0, 0.5, 1]
                          }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 1, 0.4]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            times: [0, 0.5, 1],
                            delay: 0.2
                          }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.4, 1, 0.4]
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "loop",
                            times: [0, 0.5, 1],
                            delay: 0.4
                          }}
                          className="w-2 h-2 bg-gray-400 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </ScrollArea>

            <ChatInput
              value={input}
              onChange={setInput}
              onSend={handleSendMessage}
              onKeyPress={handleKeyPress}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface;