import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, BookOpen, Star, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Audiobook {
  id: number;
  title: string;
  author: string;
  cover: string;
  rating: number;
  reviews: number;
  price: number;
  category: string;
}

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price">("popular");
  const navigate = useNavigate();
  const { toast } = useToast();

  const categories = [
    "All Categories",
    "Technology",
    "Science Fiction",
    "Education",
    "Business",
    "Self-Help"
  ];

  const audiobooks: Audiobook[] = [
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
    }
  ];

  const filteredBooks = audiobooks
    .filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(book => 
      selectedCategory === "All Categories" ? true : book.category === selectedCategory
    );

  const handlePurchase = async (bookId: number) => {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session?.session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to purchase audiobooks",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    toast({
      title: "Purchase initiated",
      description: "Processing your purchase...",
    });
    // Implement purchase logic here
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
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
          
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[150px]">
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedCategory}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Sort by: {sortBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("popular")}>
                  Most Popular
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("newest")}>
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price")}>
                  Price
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
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
                  <Button 
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white group-hover:scale-105 transition-transform"
                    onClick={() => handlePurchase(book.id)}
                  >
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
      <Footer />
    </main>
  );
};

export default Marketplace;