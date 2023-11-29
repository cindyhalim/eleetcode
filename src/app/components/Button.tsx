import type { PropsWithChildren } from 'react'

type ButtonProps = {
  onClick: () => void
}
export default function Button({
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type="button"
      className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 "
      onClick={onClick}
    >
      {children}
    </button>
  )
}
