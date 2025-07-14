import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MessageCircle, Heart, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface MatchCelebrationProps {
  profile: {
    _id: string
    name: string
    profileImage: string
    teachingSkills: Array<{ name: string; level: string }>
    learningSkills: Array<{ name: string; level: string }>
  }
  onClose: () => void
}

export function MatchCelebration({ profile, onClose }: MatchCelebrationProps) {
  const navigate = useNavigate()
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleSendMessage = () => {
    console.log(`Navigating to chat with ${profile._id}`)
    navigate(`/chat/${profile._id}`)
    onClose()
  }

  const handleKeepSwiping = () => {
    console.log('Continuing to swipe')
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="relative overflow-hidden">
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 animate-bounce">
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </div>
              <div className="absolute top-4 right-1/4 animate-bounce delay-100">
                <Sparkles className="h-4 w-4 text-pink-500" />
              </div>
              <div className="absolute top-8 left-1/2 animate-bounce delay-200">
                <Sparkles className="h-5 w-5 text-blue-500" />
              </div>
              <div className="absolute top-2 right-1/3 animate-bounce delay-300">
                <Sparkles className="h-3 w-3 text-green-500" />
              </div>
            </div>
          )}

          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full gradient-bg flex items-center justify-center animate-pulse">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
              It's a Match! 🎉
            </DialogTitle>
            <DialogDescription className="text-base">
              You both want to learn from each other!
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <Card className="glass-effect">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile.profileImage} />
                    <AvatarFallback>
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{profile.name}</h3>
                    
                    {/* Common Skills */}
                    <div className="mt-2 space-y-1">
                      {profile.teachingSkills.slice(0, 2).map((skill, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          Can teach: <span className="font-medium text-blue-600">{skill.name}</span>
                        </div>
                      ))}
                      {profile.learningSkills.slice(0, 1).map((skill, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          Wants to learn: <span className="font-medium text-orange-600">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleKeepSwiping}
              className="flex-1"
            >
              Keep Swiping
            </Button>
            <Button
              onClick={handleSendMessage}
              className="flex-1 gradient-bg"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}