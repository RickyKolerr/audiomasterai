import { Search, Book, Mic2, Share2, Crown, Upload, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConvertButton } from "@/components/ui/convert-button";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
              Audiovable
            </span>{" "}
            Documentation
            <span className="block text-lg text-gray-400 mt-2">by Kolerr Technologies</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            This page is designed to help you understand how to use the features and functionality of our platform in a simple and clear manner.
          </p>
          <div className="flex justify-center mb-8">
            <ConvertButton />
          </div>
        </div>

        <ScrollArea className="h-[500px]">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <Search className="h-6 w-6 text-muted-foreground" />
              <h2 className="text-2xl font-semibold">Search Documentation</h2>
            </div>
            <Input placeholder="Search..." className="w-full" />
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="text-3xl font-bold">Getting Started</h2>
            <p className="text-muted-foreground">
              Learn how to set up your account and start using Audiovable.
            </p>
            <div className="flex items-center space-x-4">
              <Book className="h-6 w-6 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Step 1: Create an Account</h3>
            </div>
            <p>Follow the instructions to create your account and log in.</p>

            <div className="flex items-center space-x-4">
              <Mic2 className="h-6 w-6 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Step 2: Upload Your Book</h3>
            </div>
            <p>Use the upload feature to add your books to the platform.</p>

            <div className="flex items-center space-x-4">
              <Share2 className="h-6 w-6 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Step 3: Convert to Audiobook</h3>
            </div>
            <p>Convert your uploaded books into audiobooks using our AI technology.</p>

            <div className="flex items-center space-x-4">
              <Crown className="h-6 w-6 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Step 4: Enjoy Your Audiobooks</h3>
            </div>
            <p>Listen to your audiobooks anytime, anywhere.</p>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Documentation;
