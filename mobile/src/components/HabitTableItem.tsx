import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5
export const HABIT_TABLE_ITEM_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface HabitTableItemProps extends TouchableOpacityProps {
  date: Date
  amount?: number
  completed?: number
}

export function HabitTableItem({ date, amount, completed = 0 }: HabitTableItemProps) {

  const { navigate } = useNavigation()

  const completedPercentage = !!amount ? (completed / amount) * 100 : 0
  const istoday = new Date(new Date().setHours(0, 0, 0, 0)).getTime() === date.getTime()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`
        rounded-lg 
        border-2 
        m-1
        ${(completedPercentage === 0) && 'bg-zinc-900  border-zinc-800'}
        ${(completedPercentage > 0 && completedPercentage <= 20) && 'bg-violet-900 border-violet-800'}
        ${(completedPercentage > 20 && completedPercentage <= 40) && 'bg-violet-800 border-violet-700'}
        ${(completedPercentage > 40 && completedPercentage <= 60) && 'bg-violet-700 border-violet-600'}
        ${(completedPercentage > 60 && completedPercentage <= 80) && 'bg-violet-600 border-violet-500'}
        ${(completedPercentage >= 80) && 'bg-violet-500 border-violet-400'}
        ${istoday && 'border-white border-4'}
      `}
      style={{
        width: HABIT_TABLE_ITEM_SIZE,
        height: HABIT_TABLE_ITEM_SIZE
      }}
      onPress={() => navigate('habit', {
        date: date.toISOString(),
      })}
    />
  )
}