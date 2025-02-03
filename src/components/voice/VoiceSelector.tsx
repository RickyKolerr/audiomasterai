import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Volume2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Voice {
  id: string;
  name: string;
  description: string;
  voice_id: string;
  is_premium: boolean;
}

interface VoiceSelectorProps {
  onVoiceSelect: (voiceId: string) => void;
  selectedVoiceId?: string;
}

const VoiceSelector = ({ onVoiceSelect, selectedVoiceId }: VoiceSelectorProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const { data: voices, isLoading } = useQuery({
    queryKey: ['voices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('voices')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as Voice[];
    },
  });

  const handlePreview = async (voiceId: string) => {
    if (isPlaying) return;

    setIsPlaying(true);
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: "Hello! This is a preview of how I sound.",
          voiceId,
        }),
      });

      if (!response.ok) throw new Error('Failed to generate preview');

      const audioBlob = await response.blob();
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
      audio.onended = () => setIsPlaying(false);
    } catch (error) {
      console.error('Preview error:', error);
      toast({
        title: "Preview Failed",
        description: "Could not generate voice preview. Please try again.",
        variant: "destructive",
      });
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-200">Select Voice</label>
        <div className="flex gap-2">
          <Select
            value={selectedVoiceId}
            onValueChange={onVoiceSelect}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices?.map((voice) => (
                <SelectItem key={voice.id} value={voice.voice_id}>
                  <span className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4" />
                    {voice.name}
                    {voice.is_premium && (
                      <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded">
                        Premium
                      </span>
                    )}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedVoiceId && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePreview(selectedVoiceId)}
              disabled={isPlaying}
            >
              <Play className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      {selectedVoiceId && voices?.find(v => v.voice_id === selectedVoiceId)?.description && (
        <p className="text-sm text-gray-400">
          {voices.find(v => v.voice_id === selectedVoiceId)?.description}
        </p>
      )}
    </div>
  );
};

export default VoiceSelector;