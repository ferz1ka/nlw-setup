import { ProgressBar } from "./ProgressBar"
import { HabitList } from "./HabitList";

import * as Popover from '@radix-ui/react-popover';
import { useState } from "react";

interface HabitTableItemProps {
  date: Date
  amount?: number
  defaultCompleted?: number
  snap: boolean
  disabled?: boolean
}

export function HabitTableItem({ date, amount = 0, defaultCompleted = 0, snap, disabled }: HabitTableItemProps) {

  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage = !!amount ? (completed / amount) * 100 : 0

  const isToday = new Date(new Date().setHours(0, 0, 0, 0)).getTime() === date.getTime()
  const dayMonth = date.toLocaleDateString('pt-br', { day: '2-digit', month: '2-digit' })
  const weekDayLabel = date.toLocaleDateString('pt-br', { weekday: 'long' })

  function handleCompleteHabitListChange(completed: number) {
    setCompleted(completed)
  }

  if (disabled) return (
    <div className={`
      w-10 
      h-10 
      border-2
      rounded-lg
      flex
      justify-center
      items-center
      transition-colors
      ${snap ? 'snap-start snap-always' : 'snap-none'} 
      ${disabled
        ? 'bg-zinc-900  border-zinc-800 opacity-40 cursor-not-allowed pointer-events-none'
        : `
          ${(completedPercentage === 0) && 'bg-zinc-900  border-zinc-800'}
          ${(completedPercentage > 0 && completedPercentage <= 20) && 'bg-violet-900 border-violet-800'}
          ${(completedPercentage > 20 && completedPercentage <= 40) && 'bg-violet-800 border-violet-700'}
          ${(completedPercentage > 40 && completedPercentage <= 60) && 'bg-violet-700 border-violet-600'}
          ${(completedPercentage > 60 && completedPercentage <= 80) && 'bg-violet-600 border-violet-500'}
          ${(completedPercentage >= 80) && 'bg-violet-500 border-violet-400'}
        `
      }
    `} />
  )

  return (
    <Popover.Root>
      <Popover.Trigger
        className={`
          w-10 
          h-10
          border-2
          rounded-lg
          flex
          justify-center
          items-center
          transition-colors
          focus:outline-none
          ${snap ? 'snap-start snap-always' : 'snap-none'} 
          ${(completedPercentage === 0) && 'bg-zinc-900  border-zinc-800'}
          ${(completedPercentage > 0 && completedPercentage <= 20) && 'bg-violet-900 border-violet-800'}
          ${(completedPercentage > 20 && completedPercentage <= 40) && 'bg-violet-800 border-violet-700'}
          ${(completedPercentage > 40 && completedPercentage <= 60) && 'bg-violet-700 border-violet-600'}
          ${(completedPercentage > 60 && completedPercentage <= 80) && 'bg-violet-600 border-violet-500'}
          ${(completedPercentage >= 80) && 'bg-violet-500 border-violet-400'}
          ${isToday && 'border-white border-4'}
        `}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className='font-semibold text-zinc-400'>{weekDayLabel}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayMonth}</span>

          <ProgressBar progress={completedPercentage} />
          <HabitList date={date} isToday={isToday} onCompletedChange={handleCompleteHabitListChange} />

          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}