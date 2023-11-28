import Badge from './Badge'
import Button from './Button'
import Tooltip from './Tooltip'

type ProblemProps = {
  title: string
  topics: string[]
  onClick: () => void
}

export default function Problem({ title, topics, onClick }: ProblemProps) {
  return (
    <div className="space-y-10 ">
      <div className="flex items-end">
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
      <Button onClick={onClick}>visit problem</Button>
    </div>
  )
}
