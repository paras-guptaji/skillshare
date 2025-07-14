import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Layout } from "./components/Layout"
import { BlankPage } from "./pages/BlankPage"
import { Home } from "./pages/Home"
import { ProfileSetup } from "./pages/ProfileSetup"
import { SwipeInterface } from "./pages/SwipeInterface"
import { Matches } from "./pages/Matches"
import { Chat } from "./pages/Chat"
import { Profile } from "./pages/Profile"
import { Sessions } from "./pages/Sessions"

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Home />} />
              <Route path="profile-setup" element={<ProfileSetup />} />
              <Route path="swipe" element={<SwipeInterface />} />
              <Route path="matches" element={<Matches />} />
              <Route path="chat/:matchId" element={<Chat />} />
              <Route path="profile" element={<Profile />} />
              <Route path="sessions" element={<Sessions />} />
            </Route>
            <Route path="*" element={<BlankPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App