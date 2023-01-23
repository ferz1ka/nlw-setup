import { createRef, useEffect, useState, } from "react"
import { daysInYear, generateDatesSinceFirstDayOfTheYear, generateAllDatesOfTheYear } from "../utils/generate-date-range"
import { HabitTableIndicator } from "./HabitTableIndicator"
import { HabitTableItem } from "./HabitTableItem"

const weekDaysLabel = ["D", "S", "T", "Q", "Q", "S", "S"]
const habitTableDates = generateAllDatesOfTheYear()

const today = new Date()
const minimumHabitTableDates = daysInYear(today.getFullYear())
const HabitTableDatesToFill = [...Array(minimumHabitTableDates - habitTableDates.length)]

export function HabitTable() {
  const target = createRef<HTMLDivElement>();

  const [pages, setPages] = useState(Math.ceil(minimumHabitTableDates / 126));
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentPage = (scrollProgress * pages) / 100;

  const habitTableDatesToShow = [...habitTableDates, ...HabitTableDatesToFill]

  useEffect(() => {
    if (target?.current) target?.current?.addEventListener('scroll', scrollListener);
    return () => { if (target?.current) target?.current?.removeEventListener('scroll', scrollListener) };
  });

  function scrollListener() {
    if (!target.current) return;

    const element = target.current;
    const windowScroll = element.scrollLeft;
    const totalWidth = element.scrollWidth - element.clientWidth;

    // TODO: set pages and snap dynamically
    // setPages(Math.ceil(element.scrollWidth / element.clientWidth))

    if (windowScroll <= 0) return setScrollProgress(0);
    if (windowScroll >= totalWidth) return setScrollProgress(100);

    setScrollProgress((windowScroll / totalWidth) * 100);
  }

  return (
    <div className="flex flex-col justify-center items-center gap-7">
      <div className="w-full flex gap-1">
        <div className="grid grid-rows-7 gap-3">
          {weekDaysLabel.map((weekDayLabel, index) => (
            <div key={index} className="text-zinc-400 text-xl h-10 w-10 font-bold flex justify-center items-center">{weekDayLabel}</div>
          ))}
        </div>
        <div ref={target} className="flex-1 grid grid-rows-7 grid-flow-col gap-3 overflow-x-scroll snap-x snap-mandatory scroll-smooth">
          {habitTableDatesToShow.map((date, index) => (
            <HabitTableItem
              key={index}
              amount={5}
              completed={Math.round(Math.random() * 5)}
              snap={index % 126 == 0}
              disabled={date.getTime() > today.getTime()}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        {[...Array(pages).keys()].map(page => (
          <HabitTableIndicator key={page} page={page} currentPage={currentPage} target={target} />
        ))}
      </div>
    </div>
  )
}