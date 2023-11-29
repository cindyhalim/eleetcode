'use client'

import { useContext } from 'react'

import Card from '@/app/Card'
import { DrawerContext } from './context/DrawerContext'

import { Category, Difficulty } from './types'
import SettingsDrawer from './SettingsDrawer'
import { Navbar } from './Navbar'
import TimerProvider from './context/TimerContext'

const PROBLEM = {
  [Category.ANY]: {
    id: '1',
    title: 'Any Problem',
    url: '',
    difficulty: Difficulty.EASY,
    topics: ['Hash table', 'Array'],
  },
  [Category.EASY]: {
    id: '2',
    title: 'Easy Problem',
    url: '',
    difficulty: Difficulty.EASY,
    topics: ['Linked list'],
  },
  [Category.MEDIUM]: {
    id: '3',
    title: 'Medium Problem',
    url: '',
    difficulty: Difficulty.MEDIUM,
    topics: ['Sliding window', 'Heap'],
  },
  [Category.HARD]: {
    id: '4',
    title: 'Hard Problem',
    url: '',
    difficulty: Difficulty.HARD,
    topics: ['Dynamic Programming', 'Backtracking', 'DFS'],
  },
}

function Main() {
  const { isOpen } = useContext(DrawerContext)
  const overlayClassNames = 'bg-blend-overlay blur-sm transition ease-in-out'
  return (
    <TimerProvider>
      <div
        className={`flex flex-col items-center ${
          isOpen ? overlayClassNames : ''
        }`}
      >
        <Navbar />
        <Card problem={PROBLEM} />
      </div>
    </TimerProvider>
  )
}

export default function Home() {
  return (
    <main className={`relative min-h-screen bg-slate-50/80`}>
      <SettingsDrawer />
      <Main />
    </main>
  )
}
