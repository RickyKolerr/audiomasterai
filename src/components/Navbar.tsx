import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { SettingsDropdown } from "@/components/settings/SettingsDropdown"
import { ProfileDropdown } from "@/components/settings/ProfileDropdown"
import { useProfile } from "@/hooks/use-profile"

const Navbar = () => {
  const { profile } = useProfile()

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">AudioBook AI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/features" className="transition-colors hover:text-foreground/80">Features</Link>
            <Link to="/pricing" className="transition-colors hover:text-foreground/80">Pricing</Link>
            <Link to="/about" className="transition-colors hover:text-foreground/80">About</Link>
            <Link to="/docs" className="transition-colors hover:text-foreground/80">Documentation</Link>
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other elements here if needed */}
          </div>
          <nav className="flex items-center space-x-2">
            {profile ? (
              <>
                <SettingsDropdown />
                <ProfileDropdown />
              </>
            ) : (
              <Button asChild variant="default">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
