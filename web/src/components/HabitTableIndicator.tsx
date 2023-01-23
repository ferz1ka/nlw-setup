import { useState } from "react"

interface HabitTableIndicatorProps {
  page: number
  currentPage: number
  target: any
}

export function HabitTableIndicator({ page, currentPage, target }: HabitTableIndicatorProps) {
  return (
    <div
      onClick={() => {
        if (page == 0) target.current.scrollLeft = 0
        if (page == 1) target.current.scrollLeft = 936
        if (page == 2) target.current.scrollLeft = 1812
      }}
      className={`w-4 h-4 border-2 border-zinc-800 rounded-full cursor-pointer ${currentPage >= page && currentPage <= page + 1 ? 'bg-violet-500 scale-125 transition' : 'bg-zinc-900'}`}
    />
  )
}