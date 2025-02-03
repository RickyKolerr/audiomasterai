import { Headphones, Book, Settings, ChartBar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ConvertButton } from "@/components/ui/convert-button";
import BookConversion from "@/components/conversion/BookConversion";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const { data: recentConversions } = useQuery({
    queryKey: ['recentConversions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  const scrollToConversion = () => {
    const conversionSection = document.getElementById('conversion-section');
    if (conversionSection) {
      conversionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black via-black to-accent/5">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl opacity-20" />
        <div className="absolute top-20 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container mx-auto px-4 pt-32 md:pt-40 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
              Transform Your Books into{' '}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent">
                Professional Audio
              </span>
              <span className="block text-xl md:text-2xl mt-4 text-gray-400 font-normal">
                Create high-quality audiobooks with AI-powered voice technology
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in max-w-2xl mx-auto">
              Convert any book into a professionally narrated audiobook with customizable voices and natural-sounding speech
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              onClick={scrollToConversion}
              className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 group"
            >
              <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Convert Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-accent text-accent hover:bg-accent/10 hover:text-accent-foreground group shadow-lg shadow-accent/5 hover:shadow-accent/10 transition-all duration-300"
              onClick={() => navigate("/marketplace")}
            >
              <Headphones className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Browse Library
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in">
            <Card className="p-8 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-300 group backdrop-blur-sm">
              <Book className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Conversion</h3>
              <p className="text-gray-400">Advanced AI technology converts your books into natural-sounding audiobooks with high accuracy and clarity.</p>
            </Card>
            
            <Card className="p-8 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group backdrop-blur-sm">
              <Settings className="w-12 h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Voice Customization</h3>
              <p className="text-gray-400">Choose from multiple premium voices and customize pitch, speed, and tone to match your preferences.</p>
            </Card>
            
            <Card className="p-8 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 hover:border-accent/40 transition-all duration-300 group backdrop-blur-sm">
              <ChartBar className="w-12 h-12 text-accent mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-400">Track conversion progress, monitor usage, and get insights into your audiobook creation process.</p>
            </Card>
          </div>

          {recentConversions && recentConversions.length > 0 && (
            <div className="mt-16 animate-fade-in">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Conversions</h2>
              <div className="grid gap-4">
                {recentConversions.map((conversion) => (
                  <Card key={conversion.id} className="p-4 bg-black/50 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Book className="w-5 h-5 text-primary" />
                        <span className="text-white">{conversion.title}</span>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(conversion.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Smart Conversion Section */}
      <div id="conversion-section" className="w-full py-20 mt-20">
        <div className="container mx-auto px-4">
          <BookConversion />
        </div>
      </div>
    </div>
  );
};

export default Hero;