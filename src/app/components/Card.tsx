'use client'

import { useContext } from 'react'
import { Category, type Difficulty } from '../types'
import { AnimatePresence, motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import Problem from './Problem'
import CardNav from './CardNav'

type Problem = {
  id: string
  title: string
  difficulty: Difficulty
  url: string
  topics: string[]
}

type CardProps = { problem: { [key: string]: Problem } }

export default function Card({ problem }: CardProps) {
  const { currentTab } = useContext(AppContext)

  const { title, url, topics, id } = problem[currentTab]

  function handleOnClick() {
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white pt-2 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded sm:mx-auto sm:max-w-lg sm:rounded-lg md:min-w-[600px] lg:min-w-[800px] min-h-[500px]">
      <CardNav />
      <div className="py-20 px-10 lg:px-20">
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
