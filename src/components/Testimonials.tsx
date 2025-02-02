import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Student",
    content: "AudioMaster AI has revolutionized my study routine. I can now listen to my textbooks while commuting!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=1"
  },
  {
    name: "Michael Chen",
    role: "Professional",
    content: "The voice customization feature is incredible. It makes listening to books much more engaging.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=2"
  },
  {
    name: "Emily Davis",
    role: "Content Creator",
    content: "This platform has helped me create audiobooks for my blog content effortlessly.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=3"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What Our Users
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Say About Us</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-green-500/20 group"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-green-500/50 group-hover:border-green-500 transition-colors"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              
              <p className="text-gray-300">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;