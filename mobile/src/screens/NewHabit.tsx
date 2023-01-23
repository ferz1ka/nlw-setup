import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";

import { Feather } from '@expo/vector-icons'

import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import colors from "tailwindcss/colors";

const weekDaysLabel = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function NewHabit() {

  const [selectedWeekDays, setSelectedWeekDays] = useState<number[]>([])

  function handleToggleWeekDay(index: number) {
    if (selectedWeekDays.includes(index)) {
      setSelectedWeekDays(prevState => prevState.filter(dayIdx => dayIdx !== index))
    } else {
      setSelectedWeekDays(prevState => [...prevState, index])
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 70
        }}
      >
        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 border-2 border-zinc-800 text-white focus:border-green-600"
          placeholder="Ex.: Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="mt-6 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>

        <View>
          {
            weekDaysLabel.map((day, index) => (
              <CheckBox
                key={day}
                label={day}
                checked={selectedWeekDays.includes(index)}
                onPress={() => handleToggleWeekDay(index)}
              />
            ))
          }
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className='mt-6 w-full h-14 bg-green-500 rounded-lg flex-row justify-center items-center'
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
          <Text className="text-white font-semibold ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}