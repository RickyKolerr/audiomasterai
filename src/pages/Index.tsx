import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones, Book, Star, Shield } from "lucide-react";

const Index = () => {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-b from-black to-black/90">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Users", icon: Headphones },
              { number: "50K+", label: "Books Converted", icon: Book },
              { number: "4.9", label: "Average Rating", icon: Star },
              { number: "99.9%", label: "Uptime", icon: Shield },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl bg-white/5 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-4 text-green-500 group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black/90 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Reading Experience?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who have already discovered the power of AI-powered audiobooks.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;