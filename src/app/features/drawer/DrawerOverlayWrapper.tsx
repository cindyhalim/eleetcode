'use client'

import { type PropsWithChildren, useContext } from 'react'

import { DrawerContext } from '@/app/context/DrawerContext'

export default function DrawerOverlayWrapper({ children }: PropsWithChildren) {
  const { isOpen } = useContext(DrawerContext)
  const overlayClassNames = 'bg-blend-overlay blur-sm transition ease-in-out'
  return (
    <div
      className={`flex flex-col items-center ${
        isOpen ? overlayClassNames : ''
      }`}
    >
      {children}
    </div>
  )
}
