import { Text, TouchableOpacity, View, TouchableOpacityProps } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";

interface CheckBoxProps extends TouchableOpacityProps {
  label: string
  checked?: boolean
}
export function CheckBox({ label, checked = false, ...rest }: CheckBoxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {
        checked
          ? <View className="w-8 h-8 bg-green-500 border 2 border-zinc-800 rounded-lg items-center justify-center">
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </View>
          : <View className="w-8 h-8 bg-zinc-900 border 2 border-zinc-800 rounded-lg" />
      }

      <Text className="text-white ml-3 font-semibold">
        {label}
      </Text>

    </TouchableOpacity>
  )
}