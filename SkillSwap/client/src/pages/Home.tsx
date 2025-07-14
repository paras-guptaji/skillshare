import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Heart, 
  MessageCircle, 
  Calendar, 
  Trophy, 
  TrendingUp,
  Users,
  BookOpen,
  Star
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { getDashboardStats } from "@/api/dashboard"
import { useToast } from "@/hooks/useToast"

interface DashboardStats {
  totalMatches: number
  activeChats: number
  upcomingSessions: number
  skillsLearned: number
  skillsTaught: number
  rating: number
  achievements: Array<{
    _id: string
    name: string
    description: string
    icon: string
    unlockedAt: string
  }>
  recentActivity: Array<{
    _id: string
    type: string
    description: string
    timestamp: string
  }>
}

export function Home() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching dashboard stats')
        const data = await getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [toast])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
          Welcome to SkillSwap
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with learners and teachers worldwide. Share your skills and discover new ones.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigate('/swipe')} 
            className="gradient-bg hover:opacity-90 transition-opacity"
            size="lg"
          >
            <Heart className="mr-2 h-5 w-5" />
            Start Swiping
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/matches')}
            size="lg"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            View Matches
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-effect hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalMatches || 0}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeChats || 0}</div>
            <p className="text-xs text-muted-foreground">
              3 new messages
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.upcomingSessions || 0}</div>
            <p className="text-xs text-muted-foreground">
              Next session in 2 hours
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.rating || 0}/5</div>
            <p className="text-xs text-muted-foreground">
              Based on 24 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Learning Progress
            </CardTitle>
            <CardDescription>
              Skills you're currently learning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>React Development</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Spanish Language</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Digital Marketing</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
            <CardDescription>
              Your latest accomplishments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats?.achievements?.slice(0, 3).map((achievement) => (
              <div key={achievement._id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{achievement.name}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump into your most common activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => navigate('/swipe')}
            >
              <Heart className="h-6 w-6" />
              Discover Skills
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => navigate('/sessions')}
            >
              <Calendar className="h-6 w-6" />
              Schedule Session
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex-col gap-2"
              onClick={() => navigate('/profile')}
            >
              <Users className="h-6 w-6" />
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}