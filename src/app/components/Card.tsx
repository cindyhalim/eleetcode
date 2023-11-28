'use client'

import type { Difficulty } from '../types'
import Badge from './Badge'

type CardProps = {
  title: string
  difficulty: Difficulty
  url: string
  topics: string[]
}

export default function Card({ title, difficulty, url, topics }: CardProps) {
  function handleOnClick() {
    window.open(url, '_blank')
  }

  return (
    <div className="bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
      <div className="w-lg mt-20">
        <div className="divide-y divide-gray-300/50">
          <div className="space-y-6 py-8 leading-7">
            <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              onClick={handleOnClick}
            >
              visit problem
            </button>
          </div>
          <div>
            <p className="pt-8 text-sm font-semibold underline leading-7 text-gray-800 cursor-pointer">
              Topics
            </p>
            <div>
              {topics.map((topic, idx) => (
                <Badge key={idx}>{topic}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
