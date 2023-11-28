'use client'

import {
  type PropsWithChildren,
  createContext,
  useState,
  useEffect,
} from 'react'
import { Category } from '../types'
import LocalStorage from './LocalStorage'

type AppContextValues = {
  currentTab: Category
  setCurrentTab: (tab: Category) => void
}

const defaultValues = {
  currentTab: Category.ANY,
  setCurrentTab: () => {},
}

export const AppContext = createContext<AppContextValues>(defaultValues)

export default function AppProvider({ children }: PropsWithChildren) {
  const [currentTab, _setCurrentTab] = useState<Category>(Category.ANY)

  useEffect(() => {
    const hasTimerSettings = LocalStorage.getTimerSettings()

    if (!hasTimerSettings) {
      LocalStorage.setTimerSettings()
    }
  }, [])

  function setCurrentTab(tab: Category) {
    _setCurrentTab(tab)
  }

  return (
    <AppContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </AppContext.Provider>
  )
}
