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

  const trustedCompanies = [
    { 
      name: 'Oxford University Press', 
      description: 'Academic publishing and digital content transformation'
    },
    { 
      name: 'Simon & Schuster', 
      description: 'Digital audiobook production and distribution'
    },
    { 
      name: 'MIT OpenCourseWare', 
      description: 'Educational content accessibility enhancement'
    },
    { 
      name: 'Pearson Education', 
      description: 'Digital learning materials conversion'
    },
    { 
      name: 'HarperCollins Publishers', 
      description: 'Audiobook creation and distribution'
    },
    { 
      name: 'Blackstone Publishing', 
      description: 'Professional audiobook production partner'
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-black via-black to-accent/5">
      {/* Hero Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2000&q=80"
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
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

          {/* Trusted By Section */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400 mb-6">TRUSTED BY LEADING ORGANIZATIONS</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-center">
              {trustedCompanies.map((company, index) => (
                <div 
                  key={company.name}
                  className="group relative p-4 bg-black/20 rounded-lg border border-gray-800 hover:border-primary/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{company.name}</h3>
                  <p className="text-sm text-gray-400">{company.description}</p>
                </div>
              ))}
            </div>
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

      <div id="conversion-section" className="w-full py-20 mt-20">
        <div className="container mx-auto px-4">
          <BookConversion />
        </div>
      </div>
    </div>
  );
};

export default Hero;