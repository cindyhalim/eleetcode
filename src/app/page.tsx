'use client'

import Card from '@/app/components/Card'
import Pill from '@/app/components/Pill'

import { Category, Difficulty } from './types'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'

function getBackgroundColor(category: Category) {
  switch (category) {
    case Category.EASY:
      return 'bg-green-400'
    case Category.MEDIUM:
      return 'bg-orange-400'
    case Category.HARD:
      return 'bg-red-500'
    default:
      return 'bg-slate-50'
  }
}

function Navbar() {
  const { setCurrentTab } = useContext(AppContext)
  const CATEGORY_TABS = [
    Category.ANY,
    Category.EASY,
    Category.MEDIUM,
    Category.HARD,
  ]

  function handleOnClick(tab: Category) {
    setCurrentTab(tab)
  }
  return (
    <nav className="flex w-full justify-between items-center">
      <h3 className="text-2xl font-semibold hidden sm:block">eleetcode</h3>
      {CATEGORY_TABS.map((tab, idx) => (
        <Pill key={idx} onClick={() => handleOnClick(tab)}>
          {tab}
        </Pill>
      ))}
      <span>settings</span>
    </nav>
  )
}

export default function Home() {
  const { currentTab } = useContext(AppContext)

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-10 ${getBackgroundColor(
        currentTab
      )}`}
    >
      <Navbar />
      <div className="mt-40">
        <Card
          title="Palindrome Linked List"
          url=""
          difficulty={Difficulty.EASY}
          topics={['Hash table', 'Array']}
        />
      </div>
    </main>
  )
}
