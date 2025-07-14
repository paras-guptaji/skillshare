import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { useState } from "react"

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex h-[calc(100vh-4rem)] pt-16">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}