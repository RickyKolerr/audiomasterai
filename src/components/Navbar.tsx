import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-secondary/95 backdrop-blur-sm z-50 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">PWAMaster</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-white hover:text-primary transition-colors">Features</a>
          <a href="#about" className="text-white hover:text-primary transition-colors">About</a>
          <a href="#contact" className="text-white hover:text-primary transition-colors">Contact</a>
          <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;