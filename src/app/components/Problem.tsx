import Badge from './Badge'
import Tooltip from './Tooltip'

type ProblemProps = {
  title: string
  topics: string[]
  onClick: () => void
}

export default function Problem({ title, topics, onClick }: ProblemProps) {
  return (
    <div className="space-y-10 ">
      <div className="flex items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 tracking-wide">
          {title}
        </h1>
        <Tooltip>
          <h3 className="text-sm font-semibold text-gray-800 underline">
            Topics:
          </h3>
          {topics.map((topic, idx) => (
            <Badge key={idx}>{topic}</Badge>
          ))}
        </Tooltip>
      </div>
      <button
        type="button"
        className="text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={onClick}
      >
        visit problem
      </button>
    </div>
  )
}
