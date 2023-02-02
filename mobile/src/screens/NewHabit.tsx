import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

import { Feather } from '@expo/vector-icons'

import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import colors from "tailwindcss/colors";
import { api } from "../services/axios";

const weekDaysLabel = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

type FormDataType = {
  title: string
  weekDays: number[]
}

export function NewHabit() {

  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    weekDays: []
  })

  async function handleSubmit() {
    try {

      if (!formData.title.trim() || formData.weekDays.length === 0) return Alert.alert('Informe todos os dados corretamente.')

      await api.post('habits', formData)

      setFormData({
        title: '',
        weekDays: []
      })

      Alert.alert('Hábito criado com sucesso!')
    } catch (error) {
      Alert.alert('Falha na criação do hábito.. :(')
    }
  }

  function handleToggleWeekDays(weekDayIndex: number) {
    if (formData?.weekDays?.includes(weekDayIndex)) {
      setFormData(prevState => (
        {
          ...prevState,
          weekDays: prevState.weekDays.filter(weekDayNumber => weekDayNumber !== weekDayIndex)
        }
      ))
    } else {
      setFormData(prevState => (
        {
          ...prevState,
          weekDays: [...prevState.weekDays, weekDayIndex]
        }
      ))
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
          value={formData.title}
          onChangeText={text => setFormData(prevState => ({ ...prevState, title: text }))}
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
                checked={formData.weekDays.includes(index)}
                onPress={() => handleToggleWeekDays(index)}
              />
            ))
          }
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className='mt-6 w-full h-14 bg-green-500 rounded-lg flex-row justify-center items-center'
          onPress={handleSubmit}
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