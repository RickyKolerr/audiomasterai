import { useState } from "react";
import { Search, BookOpen, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const audiobooks = [
    {
      id: 1,
      title: "The Art of AI",
      author: "Dr. Sarah Johnson",
      cover: "https://i.pravatar.cc/300?img=1",
      rating: 4.8,
      reviews: 128,
      price: 9.99,
      category: "Technology"
    },
    {
      id: 2,
      title: "Digital Dreams",
      author: "Michael Chen",
      cover: "https://i.pravatar.cc/300?img=2",
      rating: 4.6,
      reviews: 95,
      price: 7.99,
      category: "Science Fiction"
    },
    {
      id: 3,
      title: "Future of Learning",
      author: "Emily Davis",
      cover: "https://i.pravatar.cc/300?img=3",
      rating: 4.9,
      reviews: 156,
      price: 12.99,
      category: "Education"
    },
    // Add more audiobooks as needed
  ];

  const categories = [
    "All Categories",
    "Technology",
    "Science Fiction",
    "Education",
    "Business",
    "Self-Help"
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Audiobook
          <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Marketplace</span>
        </h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Discover and purchase high-quality AI-generated audiobooks from our growing collection.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search audiobooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-gray-700 text-white w-full"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={index === 0 ? "default" : "outline"}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiobooks.map((book) => (
            <div
              key={book.id}
              className="bg-white/5 rounded-xl overflow-hidden border border-gray-700 hover:border-green-500/40 transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{book.title}</h3>
                  <p className="text-gray-300">{book.author}</p>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-white ml-1">{book.rating}</span>
                    <span className="text-gray-400 ml-2">({book.reviews} reviews)</span>
                  </div>
                  <span className="text-green-500 font-bold">${book.price}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-500 hover:bg-green-600 text-white group-hover:scale-105 transition-transform">
                    <Download className="w-4 h-4 mr-2" />
                    Purchase
                  </Button>
                  <Button variant="outline" className="px-4">
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;