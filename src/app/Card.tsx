'use client'

import { useContext } from 'react'
import { type DailyProblemsResponse } from './types'
import { AnimatePresence, motion } from 'framer-motion'
import { AppContext } from './context/AppContext'
import Problem from './components/Problem'
import CardNav from './components/CardNav'
import { TimerContext } from './context/TimerContext'

type CardProps = {
  problems: DailyProblemsResponse
}
export default function Card({ problems }: CardProps) {
  const { currentTab } = useContext(AppContext)
  const { startTimer } = useContext(TimerContext)

  const { title, url, topics, id, difficulty } = problems[currentTab]

  function handleOnClick() {
    window.open(url, '_blank')
    startTimer(difficulty)
  }

  return (
    <div className="mt-[100px] min-h-[500px] rounded bg-white pb-8 pt-2 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg md:min-w-[600px] lg:min-w-[800px]">
      <CardNav />
      <div className="px-10 py-20 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={id}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Problem title={title} onClick={handleOnClick} topics={topics} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
