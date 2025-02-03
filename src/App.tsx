import { BrowserRouter as Router } from "react-router-dom";
import OfflineIndicator from "./components/offline/OfflineIndicator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/pages/Features";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const App = () => {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <Router>
          <Navbar />
          <Features />
          <Footer />
          <OfflineIndicator />
        </Router>
      </TooltipProvider>
    </LanguageProvider>
  );
};

export default App;