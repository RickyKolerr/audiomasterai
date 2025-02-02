import { Book, Headphones, Upload, Settings, Share2, Crown, BookOpen } from "lucide-react";

const features = [
  {
    title: "Smart Conversion",
    description: "Convert any book into high-quality audiobooks using advanced AI",
    icon: Book,
    color: "green",
    action: "conversion-section"
  },
  {
    title: "Voice Customization",
    description: "Choose from multiple voices and customize to your preference",
    icon: Settings,
    color: "blue"
  },
  {
    title: "Share & Download",
    description: "Share your audiobooks or download for offline listening",
    icon: Share2,
    color: "pink"
  },
  {
    title: "Premium Voices",
    description: "Access high-quality, natural-sounding voices",
    icon: Crown,
    color: "purple"
  },
  {
    title: "Study Materials",
    description: "Convert study materials and notes into audio format",
    icon: BookOpen,
    color: "orange"
  },
  {
    title: "Easy Upload",
    description: "Simple drag-and-drop interface for quick uploads",
    icon: Upload,
    color: "yellow"
  }
];

const Features = () => {
  const getGradient = (color: string) => {
    const gradients = {
      green: "from-green-500/20 to-transparent border-green-500/20 hover:border-green-500/40",
      blue: "from-blue-500/20 to-transparent border-blue-500/20 hover:border-blue-500/40",
      pink: "from-pink-500/20 to-transparent border-pink-500/20 hover:border-pink-500/40",
      purple: "from-purple-500/20 to-transparent border-purple-500/20 hover:border-purple-500/40",
      orange: "from-orange-500/20 to-transparent border-orange-500/20 hover:border-orange-500/40",
      yellow: "from-yellow-500/20 to-transparent border-yellow-500/20 hover:border-yellow-500/40"
    };
    return gradients[color as keyof typeof gradients];
  };

  const getIconColor = (color: string) => {
    const colors = {
      green: "text-green-500",
      blue: "text-blue-500",
      pink: "text-pink-500",
      purple: "text-purple-500",
      orange: "text-orange-500",
      yellow: "text-yellow-500"
    };
    return colors[color as keyof typeof colors];
  };

  const handleFeatureClick = (sectionId?: string) => {
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="features" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Transform Your Reading Experience with
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Advanced Features</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl bg-gradient-to-br ${getGradient(feature.color)} border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-${feature.color}-500/10 group cursor-pointer`}
              onClick={() => handleFeatureClick(feature.action)}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${getIconColor(feature.color)} group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-${feature.color}-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;