import { Headphones, Book, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ConvertButton } from "@/components/ui/convert-button";
import BookConversion from "@/components/conversion/BookConversion";

const Hero = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const scrollToConversion = () => {
    const conversionSection = document.getElementById('conversion-section');
    if (conversionSection) {
      conversionSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black pt-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="animate-fade-in [--delay-0]">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Books Into{' '}
              <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
                Audiovable
              </span>
              <span className="block text-2xl mt-2 text-gray-400">Professional Audiobook Creation Platform</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in [--delay-1]">
              Using advanced AI technology to convert your books into high-quality audiobooks with natural-sounding voices
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [--delay-2]">
            <ConvertButton onClick={scrollToConversion} />
            <Button 
              size="lg" 
              variant="outline" 
              className="border-pink-500 text-pink-500 hover:bg-pink-500/10 hover:text-pink-400 group"
              onClick={() => navigate("/marketplace")}
            >
              <Headphones className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Browse Library
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in [--delay-3]">
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
              <Book className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Conversion</h3>
              <p className="text-gray-400">Convert your books into high-quality audiobooks using advanced AI technology</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
              <Settings className="w-12 h-12 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Voice Customization</h3>
              <p className="text-gray-400">Customize voice, speed, and tone to create the perfect listening experience</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
              <Headphones className="w-12 h-12 text-pink-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Share & Download</h3>
              <p className="text-gray-400">Easily share and download your audiobooks for offline listening</p>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Conversion Section */}
      <div id="conversion-section" className="w-full py-20">
        <div className="container mx-auto px-4">
          <BookConversion />
        </div>
      </div>
    </div>
  );
};

export default Hero;