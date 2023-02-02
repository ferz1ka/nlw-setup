import { useCallback, useState } from "react";
import { Text, View, ScrollView } from "react-native";

// Components
import { HabitTableItem, HABIT_TABLE_ITEM_SIZE } from "../components/HabitTableItem";
import { Header } from "../components/Header";

// Utils
import { daysInYear, generateDatesSinceFirstDayOfTheYear } from '../utils/generate-date-range'

// Services
import { api } from "../services/axios";
import { Loading } from "../components/Loading";
import { useFocusEffect } from "@react-navigation/native";

const today = new Date()
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const habitTableDates = generateDatesSinceFirstDayOfTheYear()
const minimumHabitTableDates = daysInYear(today.getFullYear())
const habitTableDatesToFill = [...Array(minimumHabitTableDates - habitTableDates.length)]

type Summary = {
  id: string
  date: string
  amount: number
  completed: number
}[]

export function Home() {

  const [summary, setSummary] = useState<Summary>([])
  const [loading, setLoading] = useState(true)

  async function fetchSummaryData() {
    try {
      setLoading(true)
      const res = await api.get('summary')
      setSummary(res.data)
    } catch (error) {
      console.log('Erro na busca dos hábitos.. :(')
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchSummaryData()
  }, []))

  if (loading) return <Loading />

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((weekDay, index) => (
            <Text
              key={`${weekDay}-${index}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: HABIT_TABLE_ITEM_SIZE }}
            >
              {weekDay}
            </Text>
          ))
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      >
        <View className="flex-row flex-wrap">
          {
            habitTableDates.map(date => {
              const isSummaryDay = summary.find(day => new Date(day.date).getTime() === new Date(date).getTime())
              return (
                <HabitTableItem
                  key={date.toISOString()}
                  date={date}
                  amount={isSummaryDay?.amount}
                  completed={isSummaryDay?.completed}
                />
              )
            })
          }
          {
            habitTableDatesToFill.map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{
                  width: HABIT_TABLE_ITEM_SIZE,
                  height: HABIT_TABLE_ITEM_SIZE
                }}
              />
            ))
          }
        </View>
      </ScrollView>

    </View>
  )
}