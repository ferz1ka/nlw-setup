interface HabitTableItemProps {
  snap: boolean
  disabled?: boolean
  index: number
}

export function HabitTableItem({ snap, disabled, index }: HabitTableItemProps) {
  return (
    <div className={`
      w-10 
      h-10 
      bg-zinc-900 border-2 
      border-zinc-800 rounded-lg 
      flex
      justify-center
      items-center
      ${snap ? 'snap-start snap-always' : 'snap-none'} 
      ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}

    `}>
      {index + 1}
    </div>
  )
}