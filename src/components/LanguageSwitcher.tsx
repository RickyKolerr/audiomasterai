import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Languages } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
      className="fixed bottom-4 right-4 rounded-full bg-primary/10 hover:bg-primary/20"
      title={language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh'}
    >
      <Languages className="h-5 w-5" />
    </Button>
  );
};

export default LanguageSwitcher;