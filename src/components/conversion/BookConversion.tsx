import { useState } from "react";
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

const BookConversion = () => {
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  // Mock data - replace with real API data later
  const availableBooks = [
    { id: "1", title: "The Great Gatsby" },
    { id: "2", title: "1984" },
    { id: "3", title: "Pride and Prejudice" },
  ];

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

  const startConversion = () => {
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
  };

  const filteredBooks = availableBooks.filter((book) =>
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