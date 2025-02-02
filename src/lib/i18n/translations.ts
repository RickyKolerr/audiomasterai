export const translations = {
  en: {
    common: {
      getStarted: "Get Started",
      features: "Features",
      pricing: "Pricing",
      contact: "Contact",
      marketplace: "Marketplace",
    },
    hero: {
      title: "Transform Your Books into",
      subtitle: "AI-Powered Audiobooks",
      description: "Convert any book or study material into high-quality audiobooks with customizable voices. Experience the future of reading with our AI technology.",
      convertButton: "Convert Book Now",
      browseButton: "Browse Library",
    },
    features: {
      title: "Transform Your Reading Experience with",
      subtitle: "Advanced Features",
      smartConversion: "Smart Conversion",
      voiceCustomization: "Voice Customization",
      shareDownload: "Share & Download",
      premiumVoices: "Premium Voices",
      studyMaterials: "Study Materials",
      easyUpload: "Easy Upload",
    },
  },
  vi: {
    common: {
      getStarted: "Bắt Đầu",
      features: "Tính Năng",
      pricing: "Bảng Giá",
      contact: "Liên Hệ",
      marketplace: "Cửa Hàng",
    },
    hero: {
      title: "Chuyển Đổi Sách Của Bạn Thành",
      subtitle: "Sách Nói Bằng AI",
      description: "Chuyển đổi bất kỳ cuốn sách hoặc tài liệu học tập nào thành sách nói chất lượng cao với giọng đọc tùy chỉnh. Trải nghiệm tương lai của việc đọc sách với công nghệ AI của chúng tôi.",
      convertButton: "Chuyển Đổi Ngay",
      browseButton: "Duyệt Thư Viện",
    },
    features: {
      title: "Nâng Cao Trải Nghiệm Đọc Với",
      subtitle: "Tính Năng Tiên Tiến",
      smartConversion: "Chuyển Đổi Thông Minh",
      voiceCustomization: "Tùy Chỉnh Giọng Nói",
      shareDownload: "Chia Sẻ & Tải Về",
      premiumVoices: "Giọng Đọc Cao Cấp",
      studyMaterials: "Tài Liệu Học Tập",
      easyUpload: "Tải Lên Dễ Dàng",
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.en;