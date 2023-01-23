import { ProgressBar } from "./ProgressBar"

interface HabitTableItemProps {
  completed: number
  amount: number
  snap: boolean
  disabled?: boolean
}

export function HabitTableItem({ completed, amount, snap, disabled }: HabitTableItemProps) {

  const completedPercentage = (completed / amount) * 100

  return (
    <div className={`
      w-10 
      h-10 
      border-2
      rounded-lg
      flex
      justify-center
      items-center
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
      tooltip
    `}>
      <div className="tooltiptext flex flex-col">
        <span className='font-semibold text-zinc-400'>segunda-feira</span>
        <span className='mt-1 font-extrabold leading-tight text-3xl'>23/01</span>
        <ProgressBar progress={completedPercentage} />
      </div>
    </div>
  )
}