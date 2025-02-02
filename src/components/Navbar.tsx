import { useState } from "react";
import { Menu, X, Star, DollarSign, Mail, Book, Headphones, Crown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AuthDialog from "./auth/AuthDialog";

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/features", icon: Book, label: "Features" },
    { path: "/pricing", icon: DollarSign, label: "Pricing" },
    { path: "/marketplace", icon: ShoppingCart, label: "Marketplace" },
    { path: "/contact", icon: Mail, label: "Contact" },
  ];

  const NavContent = () => (
    <>
      {navItems.map((item) => (
        <NavigationMenuItem key={item.path}>
          <Link 
            to={item.path}
            className={`text-white hover:text-green-500 transition-colors flex items-center gap-2 group ${
              isActive(item.path) ? 'text-green-500' : ''
            }`}
          >
            <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {item.label}
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 py-4 border-b border-green-500/20">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <Headphones className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
            AudioMaster AI
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-6">
              <NavContent />
            </NavigationMenuList>
          </NavigationMenu>
          <Button 
            className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-white hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
            onClick={() => setShowAuthDialog(true)}
          >
            <Crown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Get Started
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-black border-l border-green-500/20">
            <div className="flex flex-col space-y-6 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-white hover:text-green-500 transition-colors flex items-center gap-2 group ${
                    isActive(item.path) ? 'text-green-500' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {item.label}
                </Link>
              ))}
              <Button 
                className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-white hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group w-full"
                onClick={() => {
                  setIsOpen(false);
                  setShowAuthDialog(true);
                }}
              >
                <Crown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Get Started
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
      />
    </nav>
  );
};

export default Navbar;