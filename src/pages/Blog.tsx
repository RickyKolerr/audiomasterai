import { useState } from "react";
import { BookOpen, Megaphone, ChartLine, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

type BlogPost = {
  id: number;
  category: "guides" | "news" | "updates" | "stories";
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "guides",
    title: "10 Tips for Perfect AI Voice Customization",
    description: "Learn how to fine-tune your AI voices for the most natural-sounding audiobooks.",
    date: "Mar 15, 2024",
    readTime: "5 min read",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    category: "news",
    title: "The Future of AI Text-to-Speech Technology",
    description: "Exploring the latest breakthroughs in AI voice synthesis and what they mean for audiobooks.",
    date: "Mar 14, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    category: "updates",
    title: "New Premium Voices Added to Our Collection",
    description: "Introducing 5 new AI voices with enhanced emotional expression capabilities.",
    date: "Mar 13, 2024",
    readTime: "3 min read",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    category: "stories",
    title: "From Text to Audio: A Student's Success Story",
    description: "How Sarah transformed her study materials into engaging audio content.",
    date: "Mar 12, 2024",
    readTime: "6 min read",
    image: "/placeholder.svg"
  }
];

const categories = [
  { name: "Guides & Tutorials", icon: BookOpen, filter: "guides" },
  { name: "Industry News", icon: ChartLine, filter: "news" },
  { name: "Product Updates", icon: Megaphone, filter: "updates" },
  { name: "User Stories", icon: User, filter: "stories" }
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  const handleReadMore = (postId: number) => {
    toast({
      title: "Coming Soon!",
      description: "Full article will be available soon.",
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Audiobook
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Insights</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends, tips, and updates in AI-powered audiobook technology.
            Stay informed about our product developments and success stories.
          </p>
        </div>

        {/* Category Filter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => (
            <Button
              key={category.filter}
              variant={selectedCategory === category.filter ? "default" : "outline"}
              className="flex items-center justify-center gap-2 h-auto py-4"
              onClick={() => setSelectedCategory(selectedCategory === category.filter ? null : category.filter)}
              style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
            >
              <category.icon className="w-4 h-4" />
              {category.name}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="group hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/50"
              style={{ "--delay": `${index * 100}ms` } as React.CSSProperties}
            >
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">{post.date} · {post.readTime}</span>
                  <span className="capitalize text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </span>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="ghost" 
                  className="group-hover:text-primary transition-colors"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Blog;