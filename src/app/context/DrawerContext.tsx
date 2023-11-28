'use client'

import { type PropsWithChildren, createContext, useState } from 'react'

type DrawerContextValues = {
  isOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const defaultValues = {
  isOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
}

export const DrawerContext = createContext<DrawerContextValues>(defaultValues)

export default function DrawerProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function openDrawer() {
    setIsOpen(true)
  }

  function closeDrawer() {
    setIsOpen(false)
  }
  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  )
}
