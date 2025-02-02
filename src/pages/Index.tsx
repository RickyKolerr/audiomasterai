import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BookConversion from "@/components/conversion/BookConversion";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <section id="conversion-section" className="py-20 px-4">
        <BookConversion />
      </section>
      <Features />
      <Footer />
    </main>
  );
};

export default Index;