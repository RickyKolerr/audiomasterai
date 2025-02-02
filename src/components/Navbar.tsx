import { Menu, Star, DollarSign, Mail, Book, Headphones, Crown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 py-4 border-b border-green-500/20">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <Headphones className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
            AudioMaster AI
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-6">
              <NavigationMenuItem>
                <Link 
                  to="/features"
                  className="text-white hover:text-green-500 transition-colors flex items-center gap-2 group" 
                >
                  <Book className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Features
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/pricing"
                  className="text-white hover:text-green-500 transition-colors flex items-center gap-2 group" 
                >
                  <DollarSign className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Pricing
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/marketplace"
                  className="text-white hover:text-green-500 transition-colors flex items-center gap-2 group" 
                >
                  <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Marketplace
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/contact"
                  className="text-white hover:text-green-500 transition-colors flex items-center gap-2 group" 
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button 
            className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-white hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
          >
            <Crown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Get Started
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;