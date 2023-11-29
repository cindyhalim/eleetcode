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
      className="cursor-pointer rounded bg-gray-300  px-3 py-2 text-sm font-medium uppercase text-gray-800 hover:bg-gray-200 hover:text-gray-600"
      onClick={onClick}
    >
      {children}
    </span>
  )
}
