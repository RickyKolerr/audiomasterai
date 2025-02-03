import { useState, useEffect } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LanguageProvider } from "./lib/i18n/LanguageContext"
import { ThemeProvider } from "./components/theme/ThemeProvider"
import { supabase } from "./integrations/supabase/client"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Features from "./pages/Features"
import Pricing from "./pages/Pricing"
import Contact from "./pages/Contact"
import Marketplace from "./pages/Marketplace"
import Dashboard from "./pages/Dashboard"
import Documents from "./pages/Documents"
import Settings from "./pages/Settings"
import About from "./pages/About"
import Blog from "./pages/Blog"
import Careers from "./pages/Careers"
import Community from "./pages/Community"
import HelpCenter from "./pages/HelpCenter"
import Partners from "./pages/Partners"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
import Security from "./pages/Security"
import Documentation from "./pages/Documentation"
import NotFound from "./pages/NotFound"
import LanguageSwitcher from "./components/LanguageSwitcher"

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }))
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!session) {
      return <Navigate to="/auth" replace />
    }
    return children
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="app-theme">
        <LanguageProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/documents" 
                  element={
                    <ProtectedRoute>
                      <Documents />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/community" element={<Community />} />
                <Route path="/help" element={<HelpCenter />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/security" element={<Security />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <LanguageSwitcher />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App