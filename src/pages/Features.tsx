import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BookConversion from "@/components/conversion/BookConversion";
import VoiceCustomization from "@/components/voice/VoiceCustomization";
import PremiumVoices from "@/components/voice/PremiumVoices";
import ShareDownload from "@/components/share/ShareDownload";
import StudyMaterialSection from "@/components/study/StudyMaterialSection";

const FeaturesPage = () => {
  const [session] = useState(() => supabase.auth.getSession());
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpgradeClick = () => {
    navigate("/pricing");
  };

  const handleTryFeature = () => {
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this feature",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Every Need</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive suite of features designed to transform your reading and study experience.
          </p>
        </div>

        {/* Book Conversion Section */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Smart Book Conversion</h2>
            <p className="text-gray-400">Transform any book into high-quality audiobooks</p>
          </div>
          <BookConversion />
          <div className="text-center mt-8">
            <Button onClick={handleUpgradeClick} className="bg-gradient-to-r from-green-500 to-blue-500">
              Upgrade to Convert More Books
            </Button>
          </div>
        </section>

        {/* Voice Customization Section */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Voice Customization</h2>
            <p className="text-gray-400">Personalize your audiobook experience</p>
          </div>
          <VoiceCustomization />
        </section>

        {/* Premium Voices Section */}
        <PremiumVoices />

        {/* Study Materials Section */}
        <section className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Study Materials</h2>
            <p className="text-gray-400">Convert your study materials into audio format</p>
          </div>
          <StudyMaterialSection />
        </section>

        {/* Share & Download Section */}
        <ShareDownload />
      </div>
      <Footer />
    </main>
  );
};

export default FeaturesPage;