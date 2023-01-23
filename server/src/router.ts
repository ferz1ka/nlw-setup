import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from './services/prisma'

export async function Router(app: FastifyInstance) {
  app.post('/habits', async (req, res) => {

    const createHabitBody = z.object({
      title: z.string(),
      habitWeekDays: z.array(
        z.number().min(0).max(6)
      )
    })

    const { title, habitWeekDays } = createHabitBody.parse(req.body)

    const today = new Date(new Date().setHours(0, 0, 0, 0))

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        habitWeekDays: {
          create: habitWeekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    })
  })

  app.get('/day', async (req, res) => {
    const getDayParams = z.object({
      date: z.coerce.date().transform(date => new Date(date.setHours(0, 0, 0, 0)))
    })

    const { date } = getDayParams.parse(req.query)
    const weekDay = date.getDay()

    const allHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date
        },
        habitWeekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date
      },
      include: {
        dayHabits: true
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => dayHabit.habit_id)

    return {
      allHabits,
      completedHabits
    }
  })
}

