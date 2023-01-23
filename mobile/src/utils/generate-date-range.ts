export function generateDatesSinceFirstDayOfTheYear() {
  const firstDayOfTheYear = new Date(new Date(new Date().getFullYear(), 0, 1).setHours(0, 0, 0, 0))
  const today = new Date(new Date().setHours(0, 0, 0, 0))

  const dates = []

  let compareDate = firstDayOfTheYear

  while (compareDate.getTime() <= today.getTime()) {
    dates.push(compareDate)
    compareDate = new Date(compareDate.getTime() + (3600 * 1000 * 24)) // 24h forward
  }

  return dates
}

export function generateAllDatesOfTheYear() {
  const firstDayOfTheYear = new Date(new Date().getFullYear(), 0, 1)
  const lastDayOfTheYear = new Date(new Date().getFullYear(), 11, 31)

  const dates = []
  let compareDate = firstDayOfTheYear

  while (compareDate.getTime() <= lastDayOfTheYear.getTime()) {
    dates.push(compareDate)
    compareDate = new Date(compareDate.getTime() + (3600 * 1000 * 24)) // 24h forward
  }

  return dates
}

export function daysInYear(year: number) {
  return ((year % 4 === 0 && year % 100 > 0) || year % 400 == 0) ? 366 : 365;
}