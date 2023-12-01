import { DateTime } from 'luxon'

import Card from '@/app/Card'

import TimerProvider from './context/TimerContext'
import DrawerOverlayWrapper from './features/drawer/DrawerOverlayWrapper'
import SettingsDrawer from './features/drawer/SettingsDrawer'
import { Navbar } from './Navbar'
import { type DailyProblemsResponse } from './types'

export const runtime = 'edge'

async function getProblemsForTheDay(day: string) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL
  const response = await fetch(`${baseUrl}/problems/date/${day}`, {
    method: 'get',
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    throw Error('Error retrieving problem for the day')
  }

  const problems = await response.json()

  return problems.problems as DailyProblemsResponse
}

export default async function Home() {
  const today = DateTime.now().toFormat('MM-dd-yyyy')
  const problems = await getProblemsForTheDay(today)

  return (
    <main className={`relative min-h-screen bg-slate-50/80`}>
      <SettingsDrawer />
      <TimerProvider>
        <DrawerOverlayWrapper>
          <Navbar />
          <Card problems={problems} />
        </DrawerOverlayWrapper>
      </TimerProvider>
    </main>
  )
}
