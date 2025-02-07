import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "@/pages/Index"
import Profile from "@/pages/Profile"
import Settings from "@/pages/Settings"
import Dashboard from "@/pages/Dashboard"
import Library from "@/pages/Library"
import Studio from "@/pages/Studio"
import Projects from "@/pages/Projects"
import Community from "@/pages/Community"
import Support from "@/pages/Support"
import NotFound from "@/pages/NotFound"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/library" element={<Library />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/community" element={<Community />} />
        <Route path="/support" element={<Support />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App