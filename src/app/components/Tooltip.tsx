import { PropsWithChildren } from 'react'

function QuestionIcon() {
  return (
    <button type="button">
      <svg
        className="ms-4 h-6 w-6 text-gray-800 hover:text-gray-600"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>
      <span className="sr-only">Show topics</span>
    </button>
  )
}

export default function Tooltip({ children }: PropsWithChildren) {
  return (
    <div className="group relative inline-block">
      <QuestionIcon />
      <div
        role="tooltip"
        className="invisible absolute z-10 mt-2 inline-block w-72 rounded-lg border border-gray-200 bg-white opacity-0 shadow-sm transition-opacity duration-500 group-hover:visible group-hover:opacity-100"
      >
        <div className="space-y-2 p-3">{children}</div>
      </div>
    </div>
  )
}
