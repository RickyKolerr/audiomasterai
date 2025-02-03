import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Languages } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
            className="fixed bottom-4 right-4 rounded-full bg-primary/10 hover:bg-primary/20 backdrop-blur-sm"
          >
            <Languages className="h-5 w-5" />
            <span className="sr-only">
              {language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {language === 'en' ? 'Chuyển sang tiếng Việt' : 'Switch to English'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LanguageSwitcher;