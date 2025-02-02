import { Book, Headphones, Upload, Settings, Share2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturesPage = () => {
  const features = [
    {
      title: "Smart Conversion",
      description: "Convert any book into high-quality audiobooks using advanced AI technology",
      icon: Book,
      path: "/features/conversion",
      color: "green"
    },
    {
      title: "Voice Customization",
      description: "Choose from multiple voices and customize to your preference",
      icon: Settings,
      path: "/features/voices",
      color: "blue"
    },
    {
      title: "Share & Download",
      description: "Share your audiobooks or download for offline listening",
      icon: Share2,
      path: "/features/share",
      color: "pink"
    },
    {
      title: "Premium Features",
      description: "Access exclusive features and premium voices",
      icon: Crown,
      path: "/features/premium",
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Explore Our
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Features</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link 
              key={index}
              to={feature.path}
              className="group"
            >
              <div className={`p-8 rounded-xl bg-gradient-to-br from-${feature.color}-500/10 to-transparent border border-${feature.color}-500/20 hover:border-${feature.color}-500/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-${feature.color}-500/10`}>
                <feature.icon className={`w-12 h-12 text-${feature.color}-500 mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <Button 
                  className={`bg-${feature.color}-500 hover:bg-${feature.color}-600 text-white group-hover:scale-105 transition-transform`}
                >
                  Learn More
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;