import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5
export const HABIT_TABLE_ITEM_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface HabitTableItemProps extends TouchableOpacityProps {

}

export function HabitTableItem({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
      style={{
        width: HABIT_TABLE_ITEM_SIZE,
        height: HABIT_TABLE_ITEM_SIZE
      }}
      {...rest}
    />
  )
}