'use client'

import { type PropsWithChildren, createContext, useState } from 'react'
import { Category } from '../types'

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

  function setCurrentTab(tab: Category) {
    _setCurrentTab(tab)
  }

  return (
    <AppContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </AppContext.Provider>
  )
}
