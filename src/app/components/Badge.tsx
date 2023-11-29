import type { PropsWithChildren } from 'react'

export default function Badge({ children }: PropsWithChildren) {
  return (
    <span className="me-2 inline-block rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-500">
      {children}
    </span>
  )
}
