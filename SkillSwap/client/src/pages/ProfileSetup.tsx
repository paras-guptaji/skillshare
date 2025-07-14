import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Upload,
  Plus,
  X,
  MapPin,
  Clock,
  User,
  BookOpen,
  Calendar
} from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "@/api/profile"
import { useToast } from "@/hooks/useToast"
import { SkillSelector } from "@/components/SkillSelector"
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar"

interface ProfileSetupForm {
  name: string
  bio: string
  location: string
  profileImage: string
  teachingSkills: Array<{ name: string; level: string }>
  learningSkills: Array<{ name: string; level: string }>
  availability: any
}

export function ProfileSetup() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [profileImage, setProfileImage] = useState<string>("")
  const [teachingSkills, setTeachingSkills] = useState<Array<{ name: string; level: string }>>([])
  const [learningSkills, setLearningSkills] = useState<Array<{ name: string; level: string }>>([])
  const [availability, setAvailability] = useState({})

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ProfileSetupForm>()

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: ProfileSetupForm) => {
    try {
      console.log('Submitting profile setup:', data)
      await updateProfile({
        ...data,
        profileImage,
        teachingSkills,
        learningSkills,
        availability
      })

      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully set up.",
      })

      navigate('/')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      })
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <p className="text-muted-foreground">
          Let's set up your profile to find the perfect skill matches
        </p>
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Tell us about yourself and upload a profile photo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profileImage} />
                  <AvatarFallback>
                    <User className="h-16 w-16" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-image"
                  />
                  <Label htmlFor="profile-image" className="cursor-pointer">
                    <Button type="button" variant="outline" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </span>
                    </Button>
                  </Label>
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  {...register("bio", { 
                    required: "Bio is required",
                    maxLength: { value: 150, message: "Bio must be 150 characters or less" }
                  })}
                  placeholder="Tell others about yourself..."
                  className="resize-none"
                  rows={3}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  {errors.bio && (
                    <p className="text-red-500">{errors.bio.message}</p>
                  )}
                  <p className="ml-auto">{watch("bio")?.length || 0}/150</p>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    {...register("location", { required: "Location is required" })}
                    placeholder="Enter your city"
                    className="pl-10"
                  />
                </div>
                {errors.location && (
                  <p className="text-sm text-red-500">{errors.location.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Skills */}
        {currentStep === 2 && (
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Skills Portfolio
              </CardTitle>
              <CardDescription>
                Add skills you can teach and skills you want to learn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SkillSelector
                teachingSkills={teachingSkills}
                learningSkills={learningSkills}
                onTeachingSkillsChange={setTeachingSkills}
                onLearningSkillsChange={setLearningSkills}
              />
            </CardContent>
          </Card>
        )}

        {/* Step 3: Availability */}
        {currentStep === 3 && (
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Availability
              </CardTitle>
              <CardDescription>
                Set your preferred times for learning and teaching sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AvailabilityCalendar
                availability={availability}
                onChange={setAvailability}
              />
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" className="gradient-bg">
              Complete Setup
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}