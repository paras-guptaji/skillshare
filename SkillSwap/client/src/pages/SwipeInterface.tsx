import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  X,
  Star,
  MapPin,
  Clock,
  Filter,
  RotateCcw
} from "lucide-react"
import { getSwipeProfiles, swipeProfile } from "@/api/swipe"
import { useToast } from "@/hooks/useToast"
import { SwipeFilters } from "@/components/SwipeFilters"
import { MatchCelebration } from "@/components/MatchCelebration"

interface SwipeProfile {
  _id: string
  name: string
  age: number
  location: string
  distance: number
  bio: string
  profileImage: string
  teachingSkills: Array<{
    name: string
    level: string
  }>
  learningSkills: Array<{
    name: string
    level: string
  }>
  availability: string
  rating: number
  isOnline: boolean
}

export function SwipeInterface() {
  const { toast } = useToast()
  const [profiles, setProfiles] = useState<SwipeProfile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [matchedProfile, setMatchedProfile] = useState<SwipeProfile | null>(null)
  const [canUndo, setCanUndo] = useState(false)

  useEffect(() => {
    fetchProfiles()
  }, [])

  const fetchProfiles = async () => {
    try {
      console.log('Fetching swipe profiles')
      const data = await getSwipeProfiles()
      setProfiles(data.profiles)
      setCurrentIndex(0)
    } catch (error) {
      console.error('Error fetching profiles:', error)
      toast({
        title: "Error",
        description: "Failed to load profiles",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSwipe = async (profileId: string, action: 'like' | 'pass' | 'superlike') => {
    try {
      console.log(`Swiping ${action} on profile ${profileId}`)
      const result = await swipeProfile({ profileId, action })

      if (result.isMatch && action === 'like') {
        setMatchedProfile(profiles[currentIndex])
      }

      setCurrentIndex(prev => prev + 1)
      setCanUndo(true)

      setTimeout(() => setCanUndo(false), 5000)

      if (result.isMatch) {
        toast({
          title: "It's a Match! 🎉",
          description: "You both want to learn from each other!",
        })
      }
    } catch (error) {
      console.error('Error swiping profile:', error)
      toast({
        title: "Error",
        description: "Failed to process swipe",
        variant: "destructive"
      })
    }
  }

  const handleUndo = () => {
    if (canUndo && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setCanUndo(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Finding amazing people for you...</p>
        </div>
      </div>
    )
  }

  const currentProfile = profiles[currentIndex]

  if (!currentProfile) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 flex items-center justify-center mx-auto">
            <Heart className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold">No more profiles!</h2>
          <p className="text-muted-foreground max-w-md">
            You've seen everyone in your area. Try adjusting your filters or check back later for new members.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => setShowFilters(true)} variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Adjust Filters
            </Button>
            <Button onClick={fetchProfiles}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Discover</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4" />
          </Button>
          {canUndo && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleUndo}
              className="animate-pulse"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <Card className="relative overflow-hidden h-[600px] glass-effect">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%), url(${currentProfile.profileImage})`
          }}
        />

        <CardContent className="relative h-full flex flex-col justify-end p-6 text-white">
          <div className="space-y-4">
            {/* Online Status */}
            {currentProfile.isOnline && (
              <Badge className="bg-green-500 text-white w-fit">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                Online
              </Badge>
            )}

            {/* Basic Info */}
            <div>
              <h2 className="text-3xl font-bold">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                <span>{currentProfile.location} • {currentProfile.distance}km away</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-white/90">{currentProfile.bio}</p>

            {/* Skills */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold mb-2">Can teach:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.teachingSkills.map((skill, index) => (
                    <Badge key={index} className="bg-blue-500/80 text-white">
                      {skill.name} • {skill.level}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Wants to learn:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.learningSkills.map((skill, index) => (
                    <Badge key={index} className="bg-orange-500/80 text-white">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="h-4 w-4" />
              <span>{currentProfile.availability}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => handleSwipe(currentProfile._id, 'pass')}
        >
          <X className="h-8 w-8" />
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-16 h-16 rounded-full border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
          onClick={() => handleSwipe(currentProfile._id, 'superlike')}
        >
          <Star className="h-8 w-8" />
        </Button>

        <Button
          size="lg"
          className="w-16 h-16 rounded-full gradient-bg hover:opacity-90"
          onClick={() => handleSwipe(currentProfile._id, 'like')}
        >
          <Heart className="h-8 w-8" />
        </Button>
      </div>

      {/* Filters Modal */}
      <SwipeFilters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={fetchProfiles}
      />

      {/* Match Celebration */}
      {matchedProfile && (
        <MatchCelebration
          profile={matchedProfile}
          onClose={() => setMatchedProfile(null)}
        />
      )}
    </div>
  )
}