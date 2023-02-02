import { Text, TouchableOpacity, View, TouchableOpacityProps } from "react-native";
import { Feather } from '@expo/vector-icons'
import Animated, { BounceIn, ZoomOut } from "react-native-reanimated";
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
          ? <Animated.View
            className="w-8 h-8 bg-green-500 border 2 border-zinc-800 rounded-lg items-center justify-center"
            entering={BounceIn}
            exiting={ZoomOut}
          >
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </Animated.View>
          : <View className="w-8 h-8 bg-zinc-900 border 2 border-zinc-800 rounded-lg" />
      }

      <Text className="text-white ml-3 font-semibold">
        {label}
      </Text>

    </TouchableOpacity>
  )
}