import { DateTime } from 'luxon'

import Card from '@/app/Card'

import DrawerOverlayWrapper from './features/drawer/DrawerOverlayWrapper'
import { Navbar } from './Navbar'
import { type DailyProblemsResponse } from './types'
import dynamic from 'next/dynamic'

const TimerProvider = dynamic(() => import('./context/TimerContext'), {
  ssr: false,
})
const SettingsDrawer = dynamic(
  () => import('./features/drawer/SettingsDrawer'),
  {
    ssr: false,
  }
)

async function getProblemsForTheDay() {
  const today = DateTime.now().toFormat('MM-dd-yyyy')

  const baseUrl = process.env.BASE_SERVER_URL
  const response = await fetch(`${baseUrl}/problems/date/${today}`, {
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
  const problems = await getProblemsForTheDay()

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
