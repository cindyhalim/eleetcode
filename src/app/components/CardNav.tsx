import { useContext } from 'react'

import { AppContext } from '../context/AppContext'
import { Category } from '../types'

import CardTab from './CardTab'

const CATEGORY_TABS = [
  Category.ANY,
  Category.EASY,
  Category.MEDIUM,
  Category.HARD,
]

export default function CardNav() {
  const { setCurrentTab, currentTab } = useContext(AppContext)

  return (
    <div className="px-2 border-b border-gray-300/50">
      <nav className="grid grid-cols-4 h-[50px]">
        {CATEGORY_TABS.map((tabId, idx) => (
          <CardTab
            key={idx}
            tabId={tabId}
            isSelected={currentTab === tabId}
            onClick={() => setCurrentTab(tabId)}
          >
            {tabId}
          </CardTab>
        ))}
      </nav>
    </div>
  )
}
