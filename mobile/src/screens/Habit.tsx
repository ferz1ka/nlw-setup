import { ScrollView, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from 'dayjs'
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface HabitProps {
  date: string
}

export function Habit() {

  const route = useRoute()
  const { date } = route.params as HabitProps

  const parsedDate = dayjs(date)
  const weekDayLabel = parsedDate.format('dddd')
  const dayMonth = parsedDate.format('DD/MM')

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

        <ProgressBar progress={75} />

        <View className="mt-6">
          <CheckBox label="Beber 2L de água" checked={false} />
          <CheckBox label="Caminhar" checked={true} />
        </View>

      </ScrollView>
    </View>
  )
}