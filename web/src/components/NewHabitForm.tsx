import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../services/axios";
import { CheckBox } from "./CheckBox";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

type FormDataType = {
  title: string
  weekDays: number[]
}

export function NewHabitForm() {

  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    weekDays: []
  })

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

  async function handleSubmit(e: FormEvent) {
    try {
      e.preventDefault()

      if (!formData.title || formData.weekDays.length === 0) return alert('Informe todos os dados corretamente.')
      await api.post('habits', formData)

      setFormData({
        title: '',
        weekDays: []
      })

      alert('Hábito criado com sucesso!')
    } catch (error) {
      alert('Falha na criação do hábito.. :(')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col mt-6">

      <label htmlFor="title" className="font-semibold leading-tight">
        Qual o seu comprometimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex.: Exercícios, dormir bem, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        value={formData.title}
        onChange={event => setFormData(prevState => ({ ...prevState, title: event.target.value }))}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {
          availableWeekDays.map((day, index) => (
            <CheckBox
              key={day}
              label={day}
              checked={formData.weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDays(index)}
            />
          ))
        }
      </div>

      <button
        type="submit"
        className="mt-6 p-4 rounded-lg flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>

    </form>
  )
}