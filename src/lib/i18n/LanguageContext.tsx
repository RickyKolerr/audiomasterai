import React, { createContext, useContext, useState } from 'react';
import { translations, Language } from './translations';
import { useToast } from '@/components/ui/use-toast';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (section: keyof typeof translations.en, key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const { toast } = useToast();

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    toast({
      title: lang === 'en' ? 'Language Changed' : 'Đã Thay Đổi Ngôn Ngữ',
      description: lang === 'en' ? 'Switched to English' : 'Đã chuyển sang Tiếng Việt',
    });
  };

  const t = (section: keyof typeof translations.en, key: string): string => {
    return translations[language][section]?.[key as keyof typeof translations.en[typeof section]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};