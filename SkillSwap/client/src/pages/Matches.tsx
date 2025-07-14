import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MessageCircle,
  Calendar,
  Star,
  Clock,
  MapPin
} from "lucide-react"
import { getMatches } from "@/api/matches"
import { useToast } from "@/hooks/useToast"
import { useNavigate } from "react-router-dom"

interface Match {
  _id: string
  user: {
    _id: string
    name: string
    profileImage: string
    location: string
    isOnline: boolean
  }
  matchedAt: string
  lastMessage?: {
    content: string
    timestamp: string
    isRead: boolean
  }
  unreadCount: number
  commonSkills: string[]
}

export function Matches() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [matches, setMatches] = useState<Match[]>([])
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchMatches()
  }, [])

  useEffect(() => {
    filterMatches()
  }, [matches, searchQuery, activeTab])

  const fetchMatches = async () => {
    try {
      console.log('Fetching matches')
      const data = await getMatches()
      setMatches(data.matches)
    } catch (error) {
      console.error('Error fetching matches:', error)
      toast({
        title: "Error",
        description: "Failed to load matches",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const filterMatches = () => {
    let filtered = matches

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(match =>
        match.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.commonSkills.some(skill =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    // Filter by tab
    switch (activeTab) {
      case "recent":
        filtered = filtered.filter(match => {
          const matchDate = new Date(match.matchedAt)
          const threeDaysAgo = new Date()
          threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
          return matchDate > threeDaysAgo
        })
        break
      case "unread":
        filtered = filtered.filter(match => match.unreadCount > 0)
        break
      case "favorites":
        // This would be implemented with a favorites system
        break
    }

    setFilteredMatches(filtered)
  }

  const handleChatClick = (matchId: string) => {
    console.log(`Opening chat with match ${matchId}`)
    navigate(`/chat/${matchId}`)
  }

  const handleScheduleClick = (matchId: string) => {
    console.log(`Scheduling session with match ${matchId}`)
    // This would open a scheduling modal or navigate to scheduling page
    toast({
      title: "Coming Soon",
      description: "Session scheduling will be available soon!",
    })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Matches</h1>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {matches.length} matches
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search matches by name or skill..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Matches</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="unread">
            Unread
            {matches.filter(m => m.unreadCount > 0).length > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {matches.filter(m => m.unreadCount > 0).length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredMatches.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No matches found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Start swiping to find your first matches!"
                }
              </p>
              {!searchQuery && (
                <Button onClick={() => navigate('/swipe')} className="gradient-bg">
                  Start Swiping
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredMatches.map((match) => (
                <Card key={match._id} className="glass-effect hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={match.user.profileImage} />
                          <AvatarFallback>
                            {match.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {match.user.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{match.user.name}</h3>
                          {match.unreadCount > 0 && (
                            <Badge className="bg-red-500 text-white">
                              {match.unreadCount}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          <span>{match.user.location}</span>
                          <span>•</span>
                          <Clock className="h-3 w-3" />
                          <span>Matched {new Date(match.matchedAt).toLocaleDateString()}</span>
                        </div>

                        {/* Common Skills */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {match.commonSkills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {match.commonSkills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{match.commonSkills.length - 3} more
                            </Badge>
                          )}
                        </div>

                        {/* Last Message */}
                        {match.lastMessage && (
                          <p className="text-sm text-muted-foreground truncate">
                            {match.lastMessage.content}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleChatClick(match._id)}
                          className="gradient-bg"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleScheduleClick(match._id)}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}