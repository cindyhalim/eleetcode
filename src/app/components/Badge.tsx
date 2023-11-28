import type { PropsWithChildren } from 'react'

export default function Badge({ children }: PropsWithChildren) {
  return (
    <span className="bg-gray-100 text-gray-500 text-xs font-normal px-2 py-1 rounded">
      {children}
    </span>
  )
}
