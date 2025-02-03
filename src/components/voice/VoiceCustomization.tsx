import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useVoices, synthesizeSpeech, Voice } from "@/services/elevenlabs";
import { supabase } from "@/integrations/supabase/client";

const VoiceCustomization = () => {
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [speed, setSpeed] = useState<number[]>([1]);
  const [pitch, setPitch] = useState<number[]>([1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();
  const { data: voices, isLoading: loadingVoices } = useVoices();

  const handlePreview = async () => {
    if (!selectedVoice) {
      toast({
        title: "Please select a voice",
        description: "You need to select a voice before previewing",
        variant: "destructive",
      });
      return;
    }

    setIsPlaying(true);
    try {
      const { data, error } = await supabase.functions.invoke("text-to-speech", {
        body: {
          text: "Hello! I'm your AI voice assistant. How can I help you today?",
          voiceId: selectedVoice,
        },
      });

      if (error) throw error;

      const audio = new Audio(URL.createObjectURL(new Blob([data], { type: 'audio/mpeg' })));
      audio.playbackRate = speed[0];
      await audio.play();
      
      audio.onended = () => setIsPlaying(false);
    } catch (error) {
      console.error("Error playing preview:", error);
      toast({
        title: "Error",
        description: "Failed to play voice preview. Please try again.",
        variant: "destructive",
      });
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-6 bg-black/50 rounded-xl border border-gray-800 animate-fade-in">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white">Voice Customization</h3>
        <p className="text-gray-400">
          Select and customize the perfect voice for your audiobook
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Select Voice</label>
          <Select value={selectedVoice} onValueChange={setSelectedVoice}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a voice" />
            </SelectTrigger>
            <SelectContent>
              {loadingVoices ? (
                <SelectItem value="loading" disabled>
                  Loading voices...
                </SelectItem>
              ) : (
                voices?.map((voice: Voice) => (
                  <SelectItem key={voice.voice_id} value={voice.voice_id}>
                    <span className="flex items-center gap-2">
                      {voice.name}
                    </span>
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Speed ({speed[0]}x)
            </label>
            <Slider
              value={speed}
              onValueChange={setSpeed}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">
              Pitch ({pitch[0]})
            </label>
            <Slider
              value={pitch}
              onValueChange={setPitch}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        <Button
          onClick={handlePreview}
          disabled={isPlaying || !selectedVoice}
          className="w-full bg-accent hover:bg-accent/90"
        >
          {isPlaying ? (
            "Playing..."
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Preview Voice
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default VoiceCustomization;