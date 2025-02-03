import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BookConversion from "@/components/conversion/BookConversion";
import VoiceCustomization from "@/components/voice/VoiceCustomization";
import PremiumVoices from "@/components/voice/PremiumVoices";
import ShareDownload from "@/components/share/ShareDownload";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <section id="conversion-section" className="py-20 px-4">
        <BookConversion />
      </section>
      <section id="voice-section" className="py-20 px-4 bg-black/30">
        <VoiceCustomization />
      </section>
      <PremiumVoices />
      <ShareDownload />
      <Features />
      <Footer />
    </main>
  );
};

export default Index;