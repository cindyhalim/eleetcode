'use client'

import {
  type PropsWithChildren,
  createContext,
  useState,
  useEffect,
} from 'react'
import LocalStorage from './LocalStorage'
import { Duration } from 'luxon'
import { Difficulty } from '../types'

type TimerContextValues = {
  isTimerRunning: boolean
  timeElapsed: number | null
  setTimeElapsed: (value: number | null) => void
  getTimeRemainingText: (timeElapsed: number | null) => string
  startTimer: (problemDifficulty: Difficulty) => void
}

const AUDIO_URL = '/sounds/tone.wav'
const RESET_TIMER_DELAY_MS = 5000
const ONE_SECOND = 1000

const defaultValues = {
  isTimerRunning: false,
  timeElapsed: null,
  setTimeElapsed: () => {},
  getTimeRemainingText: () => '',
  startTimer: () => {},
}

export const TimerContext = createContext<TimerContextValues>(defaultValues)

export default function TimerProvider({ children }: PropsWithChildren) {
  const [timeElapsed, setTimeElapsed] = useState<number | null>(null)
  const [originalTitle] = useState(document.title)
  const audio = new Audio(AUDIO_URL)

  useEffect(() => {
    const hasTimerSettings = LocalStorage.getTimerSettings()

    if (!hasTimerSettings) {
      LocalStorage.setTimerSettings()
    }
  }, [])

  function getDuration(problemDifficulty: Difficulty) {
    const timerSettings = LocalStorage.getTimerSettings()

    if (!timerSettings) {
      console.warn('No timer settings found')
      return 0
    }

    switch (problemDifficulty) {
      case Difficulty.EASY:
        return timerSettings.easy
      case Difficulty.MEDIUM:
        return timerSettings.medium
      case Difficulty.HARD:
        return timerSettings.hard
      default:
        throw Error('No timer settings found for difficulty')
    }
  }

  function formatTimeRemaining(timeElapsed: number) {
    return Duration.fromObject({
      seconds: timeElapsed,
    }).toFormat('mm:ss')
  }

  const getTimeRemainingText = (timeElapsed: number | null) => {
    if (timeElapsed === null) {
      return ''
    }

    if (timeElapsed === 0) {
      return "time's up!"
    }

    const formattedTimeRemaining = formatTimeRemaining(timeElapsed)
    return `${formattedTimeRemaining} remaining`
  }

  function startTimer(problemDifficulty: Difficulty) {
    const timerSettings = LocalStorage.getTimerSettings()
    if (!timerSettings?.enabled) return

    const startingDurationInSec = getDuration(problemDifficulty) * 60
    setTimeElapsed(startingDurationInSec)
  }

  useEffect(() => {
    const isTimerRunning = timeElapsed && timeElapsed >= 0

    if (isTimerRunning) {
      const timer = setInterval(() => {
        const currentTimeRemaining = timeElapsed - 1
        setTimeElapsed(currentTimeRemaining)
      }, ONE_SECOND)

      return () => clearInterval(timer)
    }
  }, [timeElapsed, setTimeElapsed])

  useEffect(() => {
    let resetTimerDelay: NodeJS.Timeout | undefined
    if (audio && timeElapsed === 0) {
      audio.play()
      resetTimerDelay = setTimeout(
        () => setTimeElapsed(null),
        RESET_TIMER_DELAY_MS
      )
    }

    if (resetTimerDelay) {
      return () => clearTimeout(resetTimerDelay)
    }
  }, [timeElapsed, setTimeElapsed])

  useEffect(() => {
    if (!timeElapsed) {
      document.title = originalTitle
    } else {
      const timeRemainingText = `[${formatTimeRemaining(
        timeElapsed
      )}] ${originalTitle}`
      document.title = timeRemainingText
    }
  }, [timeElapsed, originalTitle])

  return (
    <TimerContext.Provider
      value={{
        isTimerRunning: timeElapsed !== null,
        timeElapsed,
        setTimeElapsed,
        getTimeRemainingText,
        startTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  )
}
