import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Paperclip,
  Smile,
  Calendar,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft
} from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import { getChatMessages, sendMessage } from "@/api/chat"
import { useToast } from "@/hooks/useToast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Message {
  _id: string
  content: string
  senderId: string
  timestamp: string
  isRead: boolean
  type: 'text' | 'image' | 'file'
}

interface ChatUser {
  _id: string
  name: string
  profileImage: string
  isOnline: boolean
  lastSeen: string
}

export function Chat() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const [messages, setMessages] = useState<Message[]>([])
  const [chatUser, setChatUser] = useState<ChatUser | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (matchId) {
      fetchMessages()
    }
  }, [matchId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchMessages = async () => {
    try {
      console.log(`Fetching messages for match ${matchId}`)
      const data = await getChatMessages(matchId!)
      setMessages(data.messages)
      setChatUser(data.user)
    } catch (error) {
      console.error('Error fetching messages:', error)
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    setSending(true)
    try {
      console.log('Sending message:', newMessage)
      const message = await sendMessage({
        matchId: matchId!,
        content: newMessage,
        type: 'text'
      })
      
      setMessages(prev => [...prev, message])
      setNewMessage("")
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      })
    } finally {
      setSending(false)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat Header */}
      <Card className="glass-effect rounded-b-none">
        <CardHeader className="p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/matches')}
              className="md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Avatar className="h-12 w-12">
              <AvatarImage src={chatUser?.profileImage} />
              <AvatarFallback>
                {chatUser?.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{chatUser?.name}</h2>
              <div className="flex items-center gap-2">
                {chatUser?.isOnline ? (
                  <Badge className="bg-green-500 text-white text-xs">
                    <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                    Online
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    Last seen {new Date(chatUser?.lastSeen || '').toLocaleString()}
                  </span>
                )}
                {isTyping && (
                  <span className="text-sm text-blue-500 animate-pulse">
                    typing...
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Calendar className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Schedule Session</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <Card className="flex-1 glass-effect rounded-none overflow-hidden">
        <CardContent className="p-0 h-full">
          <div className="h-full overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === 'current-user' // This would come from auth context
              const showDate = index === 0 || 
                formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp)

              return (
                <div key={message._id}>
                  {showDate && (
                    <div className="text-center my-4">
                      <Badge variant="secondary" className="text-xs">
                        {formatDate(message.timestamp)}
                      </Badge>
                    </div>
                  )}
                  
                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isCurrentUser 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center gap-1 mt-1 ${
                        isCurrentUser ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className={`text-xs ${
                          isCurrentUser ? 'text-blue-100' : 'text-muted-foreground'
                        }`}>
                          {formatTime(message.timestamp)}
                        </span>
                        {isCurrentUser && (
                          <div className={`w-3 h-3 rounded-full ${
                            message.isRead ? 'bg-blue-200' : 'bg-blue-300'
                          }`} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card className="glass-effect rounded-t-none">
        <CardContent className="p-4">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="pr-12"
                disabled={sending}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              type="submit" 
              disabled={!newMessage.trim() || sending}
              className="gradient-bg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}