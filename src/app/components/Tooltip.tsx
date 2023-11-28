import { PropsWithChildren } from 'react'

function QuestionIcon() {
  return (
    <button type="button">
      <svg
        className="w-6 h-6 ms-4 text-gray-800 hover:text-gray-600"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clip-rule="evenodd"
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
        className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300 mt-2 z-10 inline-block bg-white border border-gray-200 rounded-lg shadow-sm w-72"
      >
        <div className="p-3 space-y-2">{children}</div>
      </div>
    </div>
  )
}
