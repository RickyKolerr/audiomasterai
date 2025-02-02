import { Menu, Book, Headphones, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 py-4 border-b border-green-500/20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Headphones className="w-8 h-8 text-green-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
            AudioMaster AI
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-4">
              <NavigationMenuItem>
                <NavigationMenuLink className="text-white hover:text-green-500 transition-colors" href="#features">
                  Features
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-white hover:text-green-500 transition-colors" href="#marketplace">
                  Marketplace
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-white hover:text-green-500 transition-colors" href="#pricing">
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button 
            className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-white hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300"
          >
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