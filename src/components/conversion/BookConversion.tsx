import { useState, useEffect } from "react";
import { Book, Play, Search, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { APIStatusBadge } from "@/components/APIStatusBadge";
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
import { useQuery } from "@tanstack/react-query";
import { synthesizeSpeech, getVoices, checkElevenLabsStatus, Voice } from "@/services/elevenlabs";

const BookConversion = () => {
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const { data: voices = [], isLoading: loadingVoices } = useQuery({
    queryKey: ['voices'],
    queryFn: getVoices,
  });

  const { data: apiStatus, isLoading: checkingStatus } = useQuery({
    queryKey: ['elevenlabs-status'],
    queryFn: checkElevenLabsStatus,
  });

  const { data: books = [], isLoading: loadingBooks } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) throw new Error('No session');

      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleFileSelect = async (file: File) => {
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
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast({
          title: "Authentication Error",
          description: "Please sign in to upload books",
          variant: "destructive",
        });
        return;
      }

      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('books')
        .upload(fileName, file);

      if (error) throw error;

      const { error: dbError } = await supabase
        .from('books')
        .insert({
          title: file.name,
          original_filename: file.name,
          file_path: data.path,
          content_type: file.type,
          file_size: file.size,
          user_id: session.session.user.id,
          voice_settings: {
            voice_id: selectedVoice,
            pitch: 1,
            speed: 1
          }
        });

      if (dbError) throw dbError;

      toast({
        title: "File Uploaded",
        description: "Your book has been uploaded successfully",
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreviewVoice = async () => {
    if (!selectedVoice) {
      toast({
        title: "Select a Voice",
        description: "Please select a voice before previewing",
        variant: "destructive",
      });
      return;
    }

    try {
      const audioUrl = await synthesizeSpeech(
        "Hello! This is a preview of how your audiobook will sound.",
        selectedVoice
      );

      if (previewAudio) {
        previewAudio.pause();
        previewAudio.src = "";
      }

      const audio = new Audio(audioUrl);
      setPreviewAudio(audio);
      await audio.play();

      toast({
        title: "Playing Preview",
        description: "Now playing voice preview",
      });
    } catch (error) {
      console.error('Error playing preview:', error);
      toast({
        title: "Preview Failed",
        description: "Failed to play voice preview. Please try again.",
        variant: "destructive",
      });
    }
  };

  const startConversion = async () => {
    if (!selectedBook || !selectedVoice) {
      toast({
        title: "Missing Information",
        description: "Please select both a book and a voice",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setProgress(0);

    try {
      // Mock conversion progress - replace with real conversion logic
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
      console.error('Error during conversion:', error);
      toast({
        title: "Conversion Failed",
        description: "Failed to convert the book. Please try again.",
        variant: "destructive",
      });
      setIsConverting(false);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-6 w-6" />
          Book to Audio Conversion
          <APIStatusBadge
            name="ElevenLabs"
            isLoading={checkingStatus}
            isError={!apiStatus}
          />
        </CardTitle>
        <CardDescription>
          Convert your books into high-quality audiobooks using AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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

          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger>
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice: Voice) => (
                <SelectItem key={voice.voice_id} value={voice.voice_id}>
                  {voice.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedVoice && (
            <Button
              onClick={handlePreviewVoice}
              variant="outline"
              className="w-full"
            >
              <Volume2 className="mr-2 h-4 w-4" />
              Preview Voice
            </Button>
          )}

          <FileUploadZone
            onFileSelect={handleFileSelect}
            acceptedFileTypes={[".pdf", ".txt"]}
            maxSizeMB={20}
          />
        </div>

        <div className="space-y-4">
          <Button
            onClick={startConversion}
            disabled={isConverting || !selectedBook || !selectedVoice}
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