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
      className="text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 "
      onClick={onClick}
    >
      {children}
    </button>
  )
}
