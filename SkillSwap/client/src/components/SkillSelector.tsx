import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, BookOpen, GraduationCap } from "lucide-react"

interface Skill {
  name: string
  level: string
}

interface SkillSelectorProps {
  teachingSkills: Skill[]
  learningSkills: Skill[]
  onTeachingSkillsChange: (skills: Skill[]) => void
  onLearningSkillsChange: (skills: Skill[]) => void
}

const skillSuggestions = [
  'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'Java', 'C++',
  'Spanish', 'French', 'German', 'Chinese', 'Japanese',
  'Guitar', 'Piano', 'Singing', 'Drawing', 'Photography',
  'Marketing', 'Business Strategy', 'Project Management',
  'UI/UX Design', 'Graphic Design', 'Video Editing',
  'Cooking', 'Fitness', 'Yoga', 'Writing', 'Public Speaking'
]

const proficiencyLevels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
]

export function SkillSelector({
  teachingSkills,
  learningSkills,
  onTeachingSkillsChange,
  onLearningSkillsChange
}: SkillSelectorProps) {
  const [newTeachingSkill, setNewTeachingSkill] = useState("")
  const [newTeachingLevel, setNewTeachingLevel] = useState("")
  const [newLearningSkill, setNewLearningSkill] = useState("")

  const addTeachingSkill = () => {
    if (newTeachingSkill.trim() && newTeachingLevel && teachingSkills.length < 10) {
      const newSkill = { name: newTeachingSkill.trim(), level: newTeachingLevel }
      onTeachingSkillsChange([...teachingSkills, newSkill])
      setNewTeachingSkill("")
      setNewTeachingLevel("")
    }
  }

  const removeTeachingSkill = (index: number) => {
    onTeachingSkillsChange(teachingSkills.filter((_, i) => i !== index))
  }

  const addLearningSkill = () => {
    if (newLearningSkill.trim() && learningSkills.length < 10) {
      const newSkill = { name: newLearningSkill.trim(), level: 'Beginner' }
      onLearningSkillsChange([...learningSkills, newSkill])
      setNewLearningSkill("")
    }
  }

  const removeLearningSkill = (index: number) => {
    onLearningSkillsChange(learningSkills.filter((_, i) => i !== index))
  }

  const handleSuggestionClick = (skill: string, type: 'teaching' | 'learning') => {
    if (type === 'teaching') {
      setNewTeachingSkill(skill)
    } else {
      setNewLearningSkill(skill)
    }
  }

  return (
    <div className="space-y-6">
      {/* Teaching Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Skills I Can Teach
          </CardTitle>
          <CardDescription>
            Add skills you can teach others ({teachingSkills.length}/10)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Teaching Skills */}
          {teachingSkills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {teachingSkills.map((skill, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {skill.name} • {skill.level}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-2"
                    onClick={() => removeTeachingSkill(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add New Teaching Skill */}
          {teachingSkills.length < 10 && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="teaching-skill">Skill Name</Label>
                  <Input
                    id="teaching-skill"
                    value={newTeachingSkill}
                    onChange={(e) => setNewTeachingSkill(e.target.value)}
                    placeholder="e.g., JavaScript, Spanish, Guitar..."
                  />
                </div>
                <div className="w-32">
                  <Label htmlFor="teaching-level">Level</Label>
                  <Select value={newTeachingLevel} onValueChange={setNewTeachingLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {proficiencyLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={addTeachingSkill}
                    disabled={!newTeachingSkill.trim() || !newTeachingLevel}
                    size="icon"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Skill Suggestions */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Popular skills:</Label>
                <div className="flex flex-wrap gap-1">
                  {skillSuggestions.slice(0, 8).map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleSuggestionClick(skill, 'teaching')}
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Skills */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Skills I Want to Learn
          </CardTitle>
          <CardDescription>
            Add skills you want to learn ({learningSkills.length}/10)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Learning Skills */}
          {learningSkills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {learningSkills.map((skill, index) => (
                <Badge key={index} className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                  {skill.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-2"
                    onClick={() => removeLearningSkill(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          {/* Add New Learning Skill */}
          {learningSkills.length < 10 && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="learning-skill">Skill Name</Label>
                  <Input
                    id="learning-skill"
                    value={newLearningSkill}
                    onChange={(e) => setNewLearningSkill(e.target.value)}
                    placeholder="e.g., Python, Photography, Cooking..."
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={addLearningSkill}
                    disabled={!newLearningSkill.trim()}
                    size="icon"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Skill Suggestions */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Popular skills:</Label>
                <div className="flex flex-wrap gap-1">
                  {skillSuggestions.slice(8, 16).map((skill) => (
                    <Button
                      key={skill}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleSuggestionClick(skill, 'learning')}
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tips */}
      <div className="text-sm text-muted-foreground space-y-1">
        <p>💡 <strong>Tip:</strong> Be specific with your skills (e.g., "React Development" instead of just "Programming")</p>
        <p>🎯 <strong>Tip:</strong> Add both technical and soft skills to attract diverse matches</p>
      </div>
    </div>
  )
}