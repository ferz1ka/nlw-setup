import { Alert, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs'
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";
import { useEffect, useState } from "react";
import { api } from "../services/axios";
import { Loading } from "../components/Loading";

interface HabitProps {
  date: string
}

interface Habits {
  allHabits: {
    id: string
    title: string
    created_at: string
  }[],
  completedHabits: string[]
}

export function Habit() {

  const { navigate } = useNavigation()

  const route = useRoute()
  const { date } = route.params as HabitProps

  const [loading, setLoading] = useState(true)
  const [habits, setHabits] = useState<Habits>({
    allHabits: [],
    completedHabits: [],
  })

  useEffect(() => {
    fetchHabitsData()
  }, [])

  async function fetchHabitsData() {
    try {
      setLoading(true)
      const res = await api.get('day', { params: { date } })
      setHabits(res.data)
    } catch (error) {
      console.log('Erro na busca das informações dos hábitos nesse dia.. :(')
    } finally {
      setLoading(false)
    }
  }

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

    } catch (error) {
      Alert.alert('Falha na atualização do hábito.. :(')
    }
  }

  const completedPercentage = !!habits.allHabits.length ? (habits.completedHabits.length / habits.allHabits.length) * 100 : 0

  const parsedDate = dayjs(date)
  const isPastDate = parsedDate.endOf('day').isBefore(new Date())
  const weekDayLabel = parsedDate.format('dddd')
  const dayMonth = parsedDate.format('DD/MM')

  if (loading) return <Loading />

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 70
        }}
      >

        <Text className="mt-6 font-semibold text-zinc-400 text-base lowercase">
          {weekDayLabel}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {dayMonth}
        </Text>

        <ProgressBar progress={completedPercentage} />

        <View className="mt-6">
          {
            habits.allHabits.length > 0
              ? habits.allHabits.map(habit => (
                <CheckBox
                  key={habit.id}
                  label={habit.title}
                  checked={habits.completedHabits.includes(habit.id)}
                  onPress={() => handleToggleHabit(habit.id)}
                  disabled={isPastDate}
                />
              ))
              : <Text className="font-semibold text-zinc-400 text-base">
                {'Você não tem nenhum hábito para esse dia da semana.. '}
                <Text className="text-violet-400 text-base underline active:text-violet-500" onPress={() => navigate('new-habit')}>
                  Começe criando um agora!
                </Text>
              </Text>
          }
        </View>

      </ScrollView>
    </View>
  )
}