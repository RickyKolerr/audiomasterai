import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import NotificationCenter from "@/components/notifications/NotificationCenter"

const DashboardNav = () => {
  return (
    <nav className="border-b border-green-500/20 bg-black/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xl font-bold text-white">
              Audiovable
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter />
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-sm font-medium text-white">U</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNav