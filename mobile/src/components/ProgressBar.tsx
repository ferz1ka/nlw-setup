import { useEffect } from "react"
import { View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

interface ProgressBarProps {
  progress?: number
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {

  const sharedProgress = useSharedValue(progress)
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${sharedProgress.value}%`
  }))

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [progress])

  return (
    <View className="w-full h-3 mt-4 rounded-xl bg-zinc-700">
      <Animated.View
        className="h-3 rounded-xl bg-violet-600"
        style={animatedStyle}
      />
    </View>
  )
}