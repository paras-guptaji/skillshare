import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { 
  Home, 
  Heart, 
  MessageCircle, 
  Calendar, 
  User, 
  Settings,
  X
} from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Discover', href: '/swipe', icon: Heart },
  { name: 'Matches', href: '/matches', icon: MessageCircle },
  { name: 'Sessions', href: '/sessions', icon: Calendar },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (href: string) => {
    console.log(`Navigating to: ${href}`)
    navigate(href)
    onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 transform bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r transition-transform duration-300 ease-in-out md:relative md:top-0 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <span className="text-lg font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Button
                  key={item.name}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12",
                    isActive && "gradient-bg text-white shadow-lg"
                  )}
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              )
            })}
          </nav>
          
          {/* Bottom section */}
          <div className="border-t p-4">
            <Button variant="ghost" className="w-full justify-start gap-3 h-12">
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}