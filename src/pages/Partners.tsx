import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Partners = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Our
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Partners</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Collaborate with us to transform the audiobook industry.
        </p>
      </div>
      <Footer />
    </main>
  );
};

export default Partners;