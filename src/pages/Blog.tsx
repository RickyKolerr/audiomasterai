import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Blog &
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Updates</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Stay up to date with our latest news, updates, and insights.
        </p>
      </div>
      <Footer />
    </main>
  );
};

export default Blog;