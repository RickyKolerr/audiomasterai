import { useState, useEffect } from "react";
import { Book, Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import FileUploadZone from "@/components/upload/FileUploadZone";
import { supabase } from "@/integrations/supabase/client";

const BookConversion = () => {
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();

  // Mock data - replace with real API data later
  const availableBooks = [
    { id: "1", title: "The Great Gatsby" },
    { id: "2", title: "1984" },
    { id: "3", title: "Pride and Prejudice" },
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setUserProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const checkConversionLimit = () => {
    if (!userProfile) return false;

    const isFreePlan = !userProfile.subscription_plan || userProfile.subscription_plan === 'free';
    if (!isFreePlan) return true;

    const monthlyLimit = 3; // Free plan limit
    const lastReset = new Date(userProfile.last_conversion_reset);
    const now = new Date();
    
    // Reset counter if it's been a month
    if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
      return true;
    }

    return userProfile.monthly_conversions_used < monthlyLimit;
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    const validTypes = ['application/pdf', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or TXT file",
        variant: "destructive",
      });
      return;
    }

    // Mock upload success - replace with real upload logic later
    toast({
      title: "File Uploaded",
      description: `Successfully uploaded ${file.name}`,
    });
  };

  const startConversion = async () => {
    if (!selectedBook) {
      toast({
        title: "No Book Selected",
        description: "Please select a book or upload a file first",
        variant: "destructive",
      });
      return;
    }

    if (!checkConversionLimit()) {
      toast({
        title: "Conversion Limit Reached",
        description: "You've reached your monthly conversion limit. Please upgrade to continue converting books.",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setProgress(0);

    try {
      // Update conversion count if user is on free plan
      if (userProfile && (!userProfile.subscription_plan || userProfile.subscription_plan === 'free')) {
        const { error } = await supabase
          .from('profiles')
          .update({
            monthly_conversions_used: (userProfile.monthly_conversions_used || 0) + 1
          })
          .eq('id', userProfile.id);

        if (error) throw error;
      }

      // Mock conversion progress - replace with real conversion logic later
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsConverting(false);
            toast({
              title: "Conversion Complete",
              description: "Your audiobook is ready!",
            });
            return 100;
          }
          return prev + 10;
        });
      }, 1000);
    } catch (error) {
      console.error('Error updating conversion count:', error);
      toast({
        title: "Error",
        description: "Failed to update conversion count",
        variant: "destructive",
      });
      setIsConverting(false);
    }
  };

  const filteredBooks = availableBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getConversionsRemaining = () => {
    if (!userProfile) return null;
    if (userProfile.subscription_plan && userProfile.subscription_plan !== 'free') return 'Unlimited';
    
    const monthlyLimit = 3;
    const used = userProfile.monthly_conversions_used || 0;
    return `${monthlyLimit - used} / ${monthlyLimit}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          Book to Audio Conversion
        </CardTitle>
        <CardDescription>
          Convert your books into high-quality audiobooks using AI
          {getConversionsRemaining() && (
            <div className="mt-2 text-sm">
              Conversions remaining this month: {getConversionsRemaining()}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search and Book Selection */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search available books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Select value={selectedBook} onValueChange={setSelectedBook}>
            <SelectTrigger>
              <SelectValue placeholder="Select a book" />
            </SelectTrigger>
            <SelectContent>
              {filteredBooks.map((book) => (
                <SelectItem key={book.id} value={book.id}>
                  {book.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FileUploadZone
            onFileSelect={handleFileSelect}
            acceptedFileTypes={[".pdf", ".txt"]}
            maxSizeMB={20}
          />
        </div>

        {/* Conversion Progress */}
        <div className="space-y-4">
          <Button
            onClick={startConversion}
            disabled={isConverting || !selectedBook}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            <Play className="mr-2 h-4 w-4" />
            {isConverting ? "Converting..." : "Start Conversion"}
          </Button>

          {(isConverting || progress > 0) && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Converting book to audio...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookConversion;