import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { X, MapPin, Clock, BookOpen } from "lucide-react"

interface SwipeFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApply: () => void
}

export function SwipeFilters({ isOpen, onClose, onApply }: SwipeFiltersProps) {
  const [distance, setDistance] = useState([25])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [availabilityTimes, setAvailabilityTimes] = useState<string[]>([])

  const skillCategories = [
    'Programming',
    'Design',
    'Languages',
    'Music',
    'Business',
    'Marketing',
    'Photography',
    'Writing'
  ]

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Chinese',
    'Japanese',
    'Portuguese',
    'Italian'
  ]

  const timeSlots = [
    'Morning (6AM - 12PM)',
    'Afternoon (12PM - 6PM)',
    'Evening (6PM - 12AM)',
    'Late Night (12AM - 6AM)'
  ]

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    )
  }

  const handleTimeToggle = (time: string) => {
    setAvailabilityTimes(prev =>
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    )
  }

  const handleApply = () => {
    console.log('Applying filters:', {
      distance: distance[0],
      skills: selectedSkills,
      languages: selectedLanguages,
      availability: availabilityTimes
    })
    onApply()
    onClose()
  }

  const handleClearAll = () => {
    setDistance([25])
    setSelectedSkills([])
    setSelectedLanguages([])
    setAvailabilityTimes([])
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Filters
          </SheetTitle>
          <SheetDescription>
            Customize your discovery preferences
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Distance */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Distance</CardTitle>
              <CardDescription>
                Maximum distance: {distance[0]}km
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Slider
                value={distance}
                onValueChange={setDistance}
                max={100}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>1km</span>
                <span>100km</span>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Skill Categories
              </CardTitle>
              <CardDescription>
                Filter by skill categories you're interested in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {skillCategories.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label htmlFor={skill} className="text-sm">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Languages</CardTitle>
              <CardDescription>
                Filter by preferred languages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={selectedLanguages.includes(language)}
                      onCheckedChange={() => handleLanguageToggle(language)}
                    />
                    <Label htmlFor={language} className="text-sm">
                      {language}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Availability
              </CardTitle>
              <CardDescription>
                When are you available for sessions?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {timeSlots.map((time) => (
                  <div key={time} className="flex items-center space-x-2">
                    <Checkbox
                      id={time}
                      checked={availabilityTimes.includes(time)}
                      onCheckedChange={() => handleTimeToggle(time)}
                    />
                    <Label htmlFor={time} className="text-sm">
                      {time}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t">
          <Button variant="outline" onClick={handleClearAll} className="flex-1">
            Clear All
          </Button>
          <Button onClick={handleApply} className="flex-1 gradient-bg">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}