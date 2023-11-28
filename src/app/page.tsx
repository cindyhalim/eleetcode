'use client'

import { useContext } from 'react'

import Card from '@/app/Card'
import DrawerProvider, { DrawerContext } from './context/DrawerContext'

import { Category, Difficulty } from './types'
import SettingsDrawer from './SettingsDrawer'
import { Navbar } from './Navbar'

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
    <>
      <div className={isOpen ? overlayClassNames : ''}>
        <Navbar />
        <Card problem={PROBLEM} />
      </div>
    </>
  )
}
export default function Home() {
  return (
    <main className={`relative min-h-screen p-10 bg-slate-50/80`}>
      <DrawerProvider>
        <SettingsDrawer />
        <Main />
      </DrawerProvider>
    </main>
  )
}
