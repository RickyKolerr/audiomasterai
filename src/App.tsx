import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "@/lib/i18n/LanguageContext"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Index from "@/pages/Index"
import Profile from "@/pages/Profile"
import Settings from "@/pages/Settings"
import Dashboard from "@/pages/Dashboard"
import Community from "@/pages/Community"
import NotFound from "@/pages/NotFound"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
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
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}

export default App