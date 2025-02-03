import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Community = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Our
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Audiovable Community</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Join our growing community of audiobook enthusiasts.
        </p>
      </div>
      <Footer />
    </main>
  );
};

export default Community;