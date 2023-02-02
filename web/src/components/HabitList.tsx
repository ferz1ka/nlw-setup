import { useEffect, useState } from "react"
import { api } from "../services/axios"
import { CheckBox } from "./CheckBox"

interface HabitListProps {
  date: Date
  isToday: boolean
  onCompletedChange: (completed: number) => void
}

interface Habits {
  allHabits: {
    id: string
    title: string
    created_at: string
  }[],
  completedHabits: string[]
}

export function HabitList({ date, isToday, onCompletedChange }: HabitListProps) {

  const [habits, setHabits] = useState<Habits>({
    allHabits: [],
    completedHabits: [],
  })

  useEffect(() => {
    api.get('day', {
      params: {
        date: date.toISOString()
      }
    }).then(res => setHabits(res.data))
  }, [])

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`habits/${habitId}/toggle`)

      let completedHabits: string[] = []

      if (habits?.completedHabits.includes(habitId)) {
        completedHabits = habits?.completedHabits.filter(id => id !== habitId)
      } else {
        completedHabits = [...habits.completedHabits, habitId]
      }

      setHabits(prevState => {
        return {
          ...prevState,
          completedHabits
        }
      })

      onCompletedChange(completedHabits.length)

    } catch (error) {
      alert('Falha na atualização do hábito')
    }
  }

  return (
    <>
      <div className="mt-6 flex flex-col gap-3">
        {habits?.allHabits.map(habit => (
          <CheckBox
            key={habit.id}
            size="large"
            label={habit.title}
            checked={habits.completedHabits.includes(habit.id)}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            disabled={!isToday}
          />
        ))}
      </div>
    </>
  )
}