import { BrowserRouter as Router } from "react-router-dom";
import OfflineIndicator from "./components/offline/OfflineIndicator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Features from "@/pages/Features";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Features />
      <Footer />
      <OfflineIndicator />
    </Router>
  );
};

export default App;
