import { useState } from "react";
import { Menu, X, Star, DollarSign, Mail, Book, Headphones, Crown, ShoppingCart, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme/ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } else {
      toast({
        title: "Signed out successfully",
      });
      navigate("/");
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/features", icon: Book, label: "Features" },
    { path: "/pricing", icon: DollarSign, label: "Pricing" },
    { path: "/documents", icon: FileText, label: "Documents" },
    { path: "/marketplace", icon: ShoppingCart, label: "Marketplace" },
    { path: "/contact", icon: Mail, label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 py-4 border-b border-green-500/20">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <Headphones className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
            Kolerr Technologies Inc
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu>
            <NavigationMenuList className="space-x-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.path}>
                  <Link 
                    to={item.path}
                    className={`text-foreground hover:text-green-500 transition-colors flex items-center gap-2 group ${
                      isActive(item.path) ? 'text-green-500' : ''
                    }`}
                  >
                    <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
          <Button 
            className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-white hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
            onClick={() => navigate("/auth")}
          >
            <Crown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Get Started
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="text-gray-400 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background border-l border-green-500/20">
            <div className="flex flex-col space-y-6 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-foreground hover:text-green-500 transition-colors flex items-center gap-2 group ${
                    isActive(item.path) ? 'text-green-500' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
              <Button 
                className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-white hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group w-full"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/auth");
                }}
              >
                <Crown className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Get Started
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
                className="w-full justify-start text-gray-400 hover:text-white"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;