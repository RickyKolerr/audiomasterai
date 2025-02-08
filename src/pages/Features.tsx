
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookConversion from "@/components/conversion/BookConversion";
import VoiceCustomization from "@/components/voice/VoiceCustomization";
import PremiumVoices from "@/components/voice/PremiumVoices";
import StudyMaterialSection from "@/components/study/StudyMaterialSection";
import ShareDownload from "@/components/share/ShareDownload";
import ProtectedFeature from "@/components/subscription/ProtectedFeature";

const Features = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="container mx-auto px-4 py-20 space-y-20">
        <ProtectedFeature requiredPlan="free" featureName="Basic Book Conversion">
          <BookConversion />
        </ProtectedFeature>

        <ProtectedFeature requiredPlan="pro" featureName="Voice Customization">
          <VoiceCustomization />
        </ProtectedFeature>

        <ProtectedFeature requiredPlan="pro" featureName="Premium Voices">
          <PremiumVoices />
        </ProtectedFeature>

        <ProtectedFeature requiredPlan="enterprise" featureName="Study Materials">
          <StudyMaterialSection />
        </ProtectedFeature>

        <ProtectedFeature requiredPlan="pro" featureName="Share & Download">
          <ShareDownload />
        </ProtectedFeature>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
