import { useState } from "react";
import { Book, Upload, Play, Search } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const BookConversion = () => {
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const { data: books, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user?.id) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", session.session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

      try {
        // Get current user
        const { data: session } = await supabase.auth.getSession();
        if (!session?.session?.user?.id) {
          toast({
            title: "Authentication Required",
            description: "Please sign in to upload books",
            variant: "destructive",
          });
          return;
        }

        // Upload file to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('books')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Create book record in database
        const { error: dbError } = await supabase
          .from('books')
          .insert({
            title: file.name.split('.')[0],
            original_filename: file.name,
            file_path: filePath,
            content_type: file.type,
            file_size: file.size,
            user_id: session.session.user.id, // Add the user_id here
          });

        if (dbError) throw dbError;

        toast({
          title: "File Uploaded",
          description: `Successfully uploaded ${file.name}`,
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Upload Failed",
          description: "There was an error uploading your file",
          variant: "destructive",
        });
      }
    }
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

    setIsConverting(true);
    setProgress(0);

    try {
      // Update book status to processing
      await supabase
        .from('books')
        .update({ status: 'processing' })
        .eq('id', selectedBook);

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
      console.error('Conversion error:', error);
      setIsConverting(false);
      toast({
        title: "Conversion Failed",
        description: "There was an error converting your book",
        variant: "destructive",
      });
    }
  };

  const filteredBooks = books?.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          Book to Audio Conversion
        </CardTitle>
        <CardDescription>
          Convert your books into high-quality audiobooks using AI
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
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </label>
              </Button>
            </div>
          </div>

          <Select value={selectedBook} onValueChange={setSelectedBook}>
            <SelectTrigger>
              <SelectValue placeholder="Select a book" />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <SelectItem value="loading" disabled>
                  Loading books...
                </SelectItem>
              ) : filteredBooks?.length === 0 ? (
                <SelectItem value="none" disabled>
                  No books found
                </SelectItem>
              ) : (
                filteredBooks?.map((book) => (
                  <SelectItem key={book.id} value={book.id}>
                    {book.title}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
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