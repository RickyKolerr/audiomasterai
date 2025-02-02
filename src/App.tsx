import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./App.css";
import Index from "./pages/Index";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <AuthProvider>
          <Router>
            <Index />
            <Toaster />
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;