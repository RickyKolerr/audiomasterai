import { useState, useEffect } from "react";
import { Crown, Play, Volume2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PremiumVoice {
  id: string;
  name: string;
  description: string;
  preview_url: string | null;
  voice_id: string;
  is_premium: boolean | null;
}

const PremiumVoices = () => {
  const [voices, setVoices] = useState<PremiumVoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchVoices();
  }, []);

  const fetchVoices = async () => {
    try {
      const { data, error } = await supabase
        .from('premium_voices')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setVoices(data || []);
    } catch (error) {
      toast({
        title: "Error fetching voices",
        description: "Failed to load premium voices. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (voiceId: string) => {
    // Mock preview functionality - to be connected with real TTS API later
    setPlayingVoiceId(voiceId);
    setTimeout(() => setPlayingVoiceId(null), 2000);
    
    toast({
      title: "Preview Playing",
      description: "This is a demo preview. Connect to TTS API for real previews.",
    });
  };

  const handleUpgrade = () => {
    navigate("/pricing");
  };

  return (
    <section id="premium-voices" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium
            <span className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-transparent bg-clip-text"> Voices</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Access our collection of high-quality, natural-sounding voices for your audiobooks.
            Upgrade to premium for exclusive voice options.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {voices.map((voice) => (
            <Card
              key={voice.id}
              className="p-6 bg-black/50 border border-yellow-500/20 hover:border-yellow-500/40 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  {voice.name}
                  {voice.is_premium && (
                    <Crown className="w-4 h-4 text-yellow-500" />
                  )}
                </h3>
                <Volume2 className="w-5 h-5 text-gray-400" />
              </div>
              
              <p className="text-gray-400 mb-6">{voice.description}</p>
              
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview(voice.id)}
                  disabled={playingVoiceId === voice.id}
                  className="border-yellow-500/20 hover:border-yellow-500/40"
                >
                  {playingVoiceId === voice.id ? (
                    "Playing..."
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Preview
                    </>
                  )}
                </Button>

                {voice.is_premium && (
                  <Button
                    onClick={handleUpgrade}
                    size="sm"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Unlock
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={handleUpgrade}
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800"
          >
            <Crown className="w-5 h-5 mr-2" />
            Upgrade to Premium
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumVoices;