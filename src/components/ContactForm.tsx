import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Send } from "lucide-react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here we'll add the actual submission logic later
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg border border-border">
      <div className="flex items-center gap-2 mb-6">
        <Mail className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold">Contact Us</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-background"
          />
        </div>
        
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background"
          />
        </div>
        
        <div>
          <Textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="min-h-[120px] bg-background"
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>Sending...</>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;