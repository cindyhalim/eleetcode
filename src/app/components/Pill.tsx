'use client'
import type { PropsWithChildren } from 'react'

type PillProps = {
  onClick: () => void
}

export default function Pill({
  children,
  onClick,
}: PropsWithChildren<PillProps>) {
  return (
    <span
      className="cursor-pointer bg-gray-300 hover:bg-gray-200  text-gray-800 hover:text-gray-600 text-sm font-medium uppercase px-3 py-2 rounded"
      onClick={onClick}
    >
      {children}
    </span>
  )
}
