
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
import VoiceSelector from "@/components/voice/VoiceSelector";
import { supabase } from "@/integrations/supabase/client";

const BookConversion = () => {
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();

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

  const handleFileSelect = async (file: File) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to upload books",
          variant: "destructive",
        });
        return;
      }

      const fileExt = file.name.split('.').pop();
      const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('books')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('books')
        .insert({
          user_id: session.user.id,
          title: file.name,
          original_filename: file.name,
          file_path: filePath,
          content_type: file.type,
          file_size: file.size,
          voice_settings: {
            voice_id: selectedVoice,
            pitch: 1,
            speed: 1
          }
        });

      if (dbError) throw dbError;

      toast({
        title: "Upload Successful",
        description: "Your book has been uploaded and is ready for conversion",
      });

      setSelectedBook(file.name);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your book",
        variant: "destructive",
      });
    }
  };

  const startConversion = async () => {
    if (!selectedBook || !selectedVoice) {
      toast({
        title: "Incomplete Selection",
        description: "Please select both a book and a voice before starting conversion",
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
      console.error('Conversion error:', error);
      toast({
        title: "Conversion Failed",
        description: "There was an error converting your book",
        variant: "destructive",
      });
      setIsConverting(false);
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
        <FileUploadZone
          onFileSelect={handleFileSelect}
          acceptedFileTypes={[".pdf", ".txt", ".doc", ".docx"]}
          maxSizeMB={20}
        />

        <VoiceSelector
          selectedVoiceId={selectedVoice}
          onVoiceSelect={setSelectedVoice}
        />

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
      </CardContent>
    </Card>
  );
};

export default BookConversion;
