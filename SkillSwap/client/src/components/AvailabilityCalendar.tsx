import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"

interface AvailabilityCalendarProps {
  availability: any
  onChange: (availability: any) => void
}

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
]

export function AvailabilityCalendar({ availability, onChange }: AvailabilityCalendarProps) {
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set())

  const getSlotKey = (day: string, time: string) => `${day}-${time}`

  const toggleSlot = (day: string, time: string) => {
    const slotKey = getSlotKey(day, time)
    const newSelectedSlots = new Set(selectedSlots)

    if (newSelectedSlots.has(slotKey)) {
      newSelectedSlots.delete(slotKey)
    } else {
      newSelectedSlots.add(slotKey)
    }

    setSelectedSlots(newSelectedSlots)
    
    // Convert to availability object
    const newAvailability: any = {}
    daysOfWeek.forEach(day => {
      newAvailability[day] = timeSlots.filter(time => 
        newSelectedSlots.has(getSlotKey(day, time))
      )
    })
    
    onChange(newAvailability)
  }

  const isSlotSelected = (day: string, time: string) => {
    return selectedSlots.has(getSlotKey(day, time))
  }

  const selectAllDay = (day: string) => {
    const newSelectedSlots = new Set(selectedSlots)
    timeSlots.forEach(time => {
      newSelectedSlots.add(getSlotKey(day, time))
    })
    setSelectedSlots(newSelectedSlots)
  }

  const clearDay = (day: string) => {
    const newSelectedSlots = new Set(selectedSlots)
    timeSlots.forEach(time => {
      newSelectedSlots.delete(getSlotKey(day, time))
    })
    setSelectedSlots(newSelectedSlots)
  }

  const getSelectedSlotsForDay = (day: string) => {
    return timeSlots.filter(time => isSlotSelected(day, time)).length
  }

  const quickSelect = (type: 'weekdays' | 'weekends' | 'evenings' | 'mornings') => {
    const newSelectedSlots = new Set<string>()

    switch (type) {
      case 'weekdays':
        daysOfWeek.slice(0, 5).forEach(day => {
          timeSlots.forEach(time => {
            newSelectedSlots.add(getSlotKey(day, time))
          })
        })
        break
      case 'weekends':
        daysOfWeek.slice(5).forEach(day => {
          timeSlots.forEach(time => {
            newSelectedSlots.add(getSlotKey(day, time))
          })
        })
        break
      case 'evenings':
        daysOfWeek.forEach(day => {
          timeSlots.slice(12, 18).forEach(time => {
            newSelectedSlots.add(getSlotKey(day, time))
          })
        })
        break
      case 'mornings':
        daysOfWeek.forEach(day => {
          timeSlots.slice(0, 6).forEach(time => {
            newSelectedSlots.add(getSlotKey(day, time))
          })
        })
        break
    }

    setSelectedSlots(newSelectedSlots)
  }

  const clearAll = () => {
    setSelectedSlots(new Set())
    onChange({})
  }

  return (
    <div className="space-y-6">
      {/* Quick Select Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Quick Select
          </CardTitle>
          <CardDescription>
            Choose common availability patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickSelect('weekdays')}
            >
              Weekdays
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickSelect('weekends')}
            >
              Weekends
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickSelect('mornings')}
            >
              Mornings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickSelect('evenings')}
            >
              Evenings
            </Button>
          </div>
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
            <Badge variant="secondary">
              {selectedSlots.size} slots selected
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Schedule
          </CardTitle>
          <CardDescription>
            Click on time slots to mark your availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{day}</h3>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {getSelectedSlotsForDay(day)} selected
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => selectAllDay(day)}
                      className="h-6 px-2 text-xs"
                    >
                      All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => clearDay(day)}
                      className="h-6 px-2 text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-6 md:grid-cols-12 gap-1">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={isSlotSelected(day, time) ? "default" : "outline"}
                      size="sm"
                      className={`h-8 text-xs ${
                        isSlotSelected(day, time)
                          ? "gradient-bg text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleSlot(day, time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timezone Note */}
      <div className="text-sm text-muted-foreground">
        <p>🌍 <strong>Note:</strong> Times are shown in your local timezone. They will be automatically converted for users in different timezones.</p>
        <p>💡 <strong>Tip:</strong> Select multiple time slots to increase your chances of finding matches!</p>
      </div>
    </div>
  )
}