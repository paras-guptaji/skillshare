import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  Video,
  MessageCircle,
  Star,
  Plus,
  ExternalLink,
  RotateCcw
} from "lucide-react"
import { getSessions, rescheduleSession, cancelSession } from "@/api/sessions"
import { useToast } from "@/hooks/useToast"

interface Session {
  _id: string
  partner: {
    _id: string
    name: string
    profileImage: string
  }
  skill: string
  type: 'teaching' | 'learning'
  scheduledAt: string
  duration: number
  status: 'scheduled' | 'completed' | 'cancelled'
  platform: string
  meetingLink?: string
  notes?: string
  rating?: number
  feedback?: string
}

export function Sessions() {
  const { toast } = useToast()
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("upcoming")

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      console.log('Fetching sessions')
      const data = await getSessions()
      setSessions(data.sessions)
    } catch (error) {
      console.error('Error fetching sessions:', error)
      toast({
        title: "Error",
        description: "Failed to load sessions",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReschedule = async (sessionId: string) => {
    try {
      console.log(`Rescheduling session ${sessionId}`)
      await rescheduleSession(sessionId)
      toast({
        title: "Session Rescheduled",
        description: "Your session has been rescheduled successfully.",
      })
      fetchSessions()
    } catch (error) {
      console.error('Error rescheduling session:', error)
      toast({
        title: "Error",
        description: "Failed to reschedule session",
        variant: "destructive"
      })
    }
  }

  const handleCancel = async (sessionId: string) => {
    try {
      console.log(`Cancelling session ${sessionId}`)
      await cancelSession(sessionId)
      toast({
        title: "Session Cancelled",
        description: "Your session has been cancelled.",
      })
      fetchSessions()
    } catch (error) {
      console.error('Error cancelling session:', error)
      toast({
        title: "Error",
        description: "Failed to cancel session",
        variant: "destructive"
      })
    }
  }

  const getUpcomingSessions = () => {
    return sessions.filter(session =>
      session.status === 'scheduled' &&
      new Date(session.scheduledAt) > new Date()
    )
  }

  const getPastSessions = () => {
    return sessions.filter(session =>
      session.status === 'completed' ||
      (session.status === 'scheduled' && new Date(session.scheduledAt) < new Date())
    )
  }

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  const getTimeUntilSession = (scheduledAt: string) => {
    const now = new Date()
    const sessionTime = new Date(scheduledAt)
    const diffMs = sessionTime.getTime() - now.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHours > 0) {
      return `in ${diffHours}h ${diffMinutes}m`
    } else if (diffMinutes > 0) {
      return `in ${diffMinutes}m`
    } else {
      return "starting soon"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Sessions</h1>
        <Button className="gradient-bg">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({getUpcomingSessions().length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({getPastSessions().length})
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Sessions */}
        <TabsContent value="upcoming" className="space-y-4">
          {getUpcomingSessions().length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No upcoming sessions</h3>
              <p className="text-muted-foreground mb-4">
                Schedule your first session to start learning or teaching!
              </p>
              <Button className="gradient-bg">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {getUpcomingSessions().map((session) => {
                const { date, time } = formatDateTime(session.scheduledAt)
                return (
                  <Card key={session._id} className="glass-effect">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={session.partner.profileImage} />
                          <AvatarFallback>
                            {session.partner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{session.partner.name}</h3>
                            <Badge className={session.type === 'teaching' ? 'bg-blue-500' : 'bg-orange-500'}>
                              {session.type === 'teaching' ? 'Teaching' : 'Learning'}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground">{session.skill}</p>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{time}</span>
                            </div>
                            <Badge variant="secondary">
                              {getTimeUntilSession(session.scheduledAt)}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {session.meetingLink && (
                            <Button size="sm" className="gradient-bg">
                              <Video className="mr-2 h-4 w-4" />
                              Join Call
                              <ExternalLink className="ml-2 h-3 w-3" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReschedule(session._id)}
                          >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* Past Sessions */}
        <TabsContent value="past" className="space-y-4">
          {getPastSessions().length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No past sessions</h3>
              <p className="text-muted-foreground">
                Your completed sessions will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {getPastSessions().map((session) => {
                const { date, time } = formatDateTime(session.scheduledAt)
                return (
                  <Card key={session._id} className="glass-effect">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={session.partner.profileImage} />
                          <AvatarFallback>
                            {session.partner.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{session.partner.name}</h3>
                            <Badge className={session.type === 'teaching' ? 'bg-blue-500' : 'bg-orange-500'}>
                              {session.type === 'teaching' ? 'Teaching' : 'Learning'}
                            </Badge>
                            <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
                              {session.status}
                            </Badge>
                          </div>

                          <p className="text-muted-foreground">{session.skill}</p>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{time}</span>
                            </div>
                            {session.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span>{session.rating}/5</span>
                              </div>
                            )}
                          </div>

                          {session.feedback && (
                            <p className="text-sm italic">"{session.feedback}"</p>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Again
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}