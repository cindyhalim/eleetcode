'use client'

import Card from '@/app/components/Card'

import { Category, Difficulty } from './types'

function Navbar() {
  return (
    <nav className="flex w-full justify-between items-center mb-[100px]">
      <h3 className="text-2xl font-semibold  text-slate-800">eleetcode</h3>
      <span>settings</span>
    </nav>
  )
}

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

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-10 bg-slate-50/80`}
    >
      <Navbar />
      <Card problem={PROBLEM} />
    </main>
  )
}
