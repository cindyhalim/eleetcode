import type { PropsWithChildren } from 'react'
import { Category } from '../types'
import { motion } from 'framer-motion'

type TabProps = {
  tabId: Category
  isSelected: boolean
  onClick: () => void
}

function getUnderlineColor(category: Category) {
  switch (category) {
    case Category.EASY:
      return 'bg-green-500'
    case Category.MEDIUM:
      return 'bg-orange-400'
    case Category.HARD:
      return 'bg-red-500'
    default:
      return 'bg-slate-600'
  }
}

function getBackgroundColor(category: Category) {
  switch (category) {
    case Category.EASY:
      return 'bg-green-200/30'
    case Category.MEDIUM:
      return 'bg-orange-200/30'
    case Category.HARD:
      return 'bg-red-200/30'
    default:
      return 'bg-slate-200/30'
  }
}

function getEmoji(category: Category) {
  switch (category) {
    case Category.EASY:
      return '🤑'
    case Category.MEDIUM:
      return '😵‍💫'
    case Category.HARD:
      return '🥵'
    default:
      return '😎'
  }
}

export default function CardTab({
  children,
  tabId,
  isSelected,
  onClick,
}: PropsWithChildren<TabProps>) {
  return (
    <div
      className={`relative cursor-pointer flex items-center p-3 ${
        isSelected
          ? `${getBackgroundColor(tabId)} rounded-tl-md rounded-tr-md`
          : ''
      }`}
      onClick={onClick}
    >
      <span className="ms-2">{getEmoji(tabId)}</span>

      <p className={`font-semibold text-md capitalize ms-2.5 text-gray-800`}>
        {children}
      </p>

      {isSelected ? (
        <motion.div
          className={`absolute bottom-[-1px] left-0 h-1 w-full ${getUnderlineColor(
            tabId
          )}`}
          layoutId="selected"
        />
      ) : null}
    </div>
  )
}
