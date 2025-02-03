import { useState } from "react";
import { Book, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import FileUploadZone from "@/components/upload/FileUploadZone";
import AudioPlayer from "@/components/audio/AudioPlayer";
import { useConversionProgress } from "@/hooks/useConversionProgress";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import BookSearch from "./BookSearch";
import ConversionProgress from "./ConversionProgress";

const BookConversion = () => {
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isOnline = useOnlineStatus();
  const { toast } = useToast();
  const progress = useConversionProgress(selectedBook);

  // Mock data - replace with real API data later
  const availableBooks = [
    { id: "1", title: "The Great Gatsby" },
    { id: "2", title: "1984" },
    { id: "3", title: "Pride and Prejudice" },
  ];

  const handleFileSelect = (file: File) => {
    if (!isOnline) {
      toast({
        title: "Offline Mode",
        description: "File upload will be queued until you're back online",
        variant: "destructive",
      });
      return;
    }

    const validTypes = ['application/pdf', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or TXT file",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "File Uploaded",
      description: `Successfully uploaded ${file.name}`,
    });
  };

  const startConversion = () => {
    if (!isOnline) {
      toast({
        title: "Offline Mode",
        description: "Conversion will start when you're back online",
        variant: "destructive",
      });
      return;
    }

    if (!selectedBook) {
      toast({
        title: "No Book Selected",
        description: "Please select a book or upload a file first",
        variant: "destructive",
      });
      return;
    }
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
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <BookSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedBook={selectedBook}
          onBookSelect={setSelectedBook}
          availableBooks={availableBooks}
        />

        <FileUploadZone
          onFileSelect={handleFileSelect}
          acceptedFileTypes={[".pdf", ".txt"]}
          maxSizeMB={20}
        />

        <div className="space-y-4">
          <Button
            onClick={startConversion}
            disabled={!isOnline || progress.status === "processing" || !selectedBook}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          >
            <Play className="mr-2 h-4 w-4" />
            {progress.status === "processing" ? "Converting..." : "Start Conversion"}
          </Button>

          {progress.status === "completed" && (
            <AudioPlayer
              src="/path/to/converted/audio.mp3"
              onError={(error) => {
                toast({
                  title: "Playback Error",
                  description: error.message,
                  variant: "destructive",
                });
              }}
            />
          )}

          <ConversionProgress
            status={progress.status}
            progress={progress.progress}
            error={progress.error}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BookConversion;
