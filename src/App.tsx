import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Index from "@/pages/Index"
import Profile from "@/pages/Profile"
import Settings from "@/pages/Settings"
import Dashboard from "@/pages/Dashboard"
import Community from "@/pages/Community"
import NotFound from "@/pages/NotFound"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App