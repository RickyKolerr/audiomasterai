import { Book, Headphones, Upload, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black pt-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('hero', 'title')}{' '}
              <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
                {t('hero', 'subtitle')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              {t('hero', 'description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
            >
              <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('hero', 'convertButton')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-pink-500 text-pink-500 hover:bg-pink-500/10 hover:text-pink-400"
            >
              <Headphones className="mr-2 h-5 w-5" />
              {t('hero', 'browseButton')}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <Book className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('features', 'smartConversion')}</h3>
              <p className="text-gray-400">{t('features', 'smartConversion')}</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <Settings className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('features', 'voiceCustomization')}</h3>
              <p className="text-gray-400">{t('features', 'voiceCustomization')}</p>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
              <Headphones className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('features', 'shareDownload')}</h3>
              <p className="text-gray-400">{t('features', 'shareDownload')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;