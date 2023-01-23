import { Text, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Components
import { HabitTableItem, HABIT_TABLE_ITEM_SIZE } from "../components/HabitTableItem";
import { Header } from "../components/Header";

// Utils
import { daysInYear, generateDatesSinceFirstDayOfTheYear } from '../utils/generate-date-range'
const today = new Date()
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const habitTableDates = generateDatesSinceFirstDayOfTheYear()
const minimumHabitTableDates = daysInYear(today.getFullYear())
const habitTableDatesToFill = [...Array(minimumHabitTableDates - habitTableDates.length)]

export function Home() {

  const { navigate } = useNavigation()

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
            habitTableDates.map(date => (
              <HabitTableItem
                key={date.toISOString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
              />
            ))
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