import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Voice {
  id: string;
  name: string;
  gender: "male" | "female";
  language: string;
  previewText: string;
}

const availableVoices: Voice[] = [
  {
    id: "voice1",
    name: "Sarah",
    gender: "female",
    language: "English (US)",
    previewText: "Hello, I'm Sarah. I can help bring your books to life.",
  },
  {
    id: "voice2",
    name: "James",
    gender: "male",
    language: "English (UK)",
    previewText: "Hi there, I'm James. Let me read your stories with style.",
  },
  {
    id: "voice3",
    name: "Maria",
    gender: "female",
    language: "Spanish",
    previewText: "¡Hola! Soy Maria. Puedo dar vida a tus historias.",
  },
  {
    id: "voice4",
    name: "Chen",
    gender: "male",
    language: "Chinese",
    previewText: "你好，我是陈。让我为您朗读精彩的故事。",
  },
];

const VoiceCustomization = () => {
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [speed, setSpeed] = useState<number[]>([1]);
  const [pitch, setPitch] = useState<number[]>([1]);
  const { toast } = useToast();

  const handlePreview = () => {
    if (!selectedVoice) {
      toast({
        title: "Please select a voice",
        description: "You need to select a voice before previewing",
        variant: "destructive",
      });
      return;
    }

    // Mock preview functionality - to be connected with real TTS API later
    const voice = availableVoices.find((v) => v.id === selectedVoice);
    toast({
      title: "Playing preview...",
      description: `${voice?.previewText} (Speed: ${speed[0]}x, Pitch: ${pitch[0]})`,
    });
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
              {availableVoices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  <span className="flex items-center gap-2">
                    {voice.name} - {voice.language}
                  </span>
                </SelectItem>
              ))}
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
          className="w-full bg-accent hover:bg-accent/90"
        >
          <Play className="w-4 h-4 mr-2" />
          Preview Voice
        </Button>
      </div>
    </div>
  );
};

export default VoiceCustomization;