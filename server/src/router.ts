import { FastifyInstance } from 'fastify'
import { date, z } from 'zod'
import { prisma } from './services/prisma'

export async function Router(app: FastifyInstance) {
  app.post('/habits', async (req) => {

    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      )
    })

    const { title, weekDays } = createHabitBody.parse(req.body)

    const today = new Date(new Date().setHours(0, 0, 0, 0))

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        habitWeekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    })
  })

  app.get('/day', async (req) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })

    const { date } = getDayParams.parse(req.query)
    const weekDay = date.getUTCDay()

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

  app.patch('/habits/:id/toggle', async (req) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid()
    })

    const { id } = toggleHabitParams.parse(req.params)

    const today = new Date(new Date().setHours(0, 0, 0, 0))

    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id
        }
      }
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    }

    else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
  })

  app.get('/summary', async () => {
    // Atenção: Essa query RAW a seguir pode funcionar somente no SQLite!
    const summary = await prisma.$queryRaw`
      SELECT 
        d.id, 
        d.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits dh
          WHERE dh.day_id = d.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days hwd
          JOIN habits h
            ON h.id = hwd.habit_id
          WHERE
            hwd.week_day = cast(strftime('%w', d.date/1000.0,'unixepoch') as int)
            and h.created_at <= d.date
        ) as amount
      FROM days d
    `

    return summary
  })
}

