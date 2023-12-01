export enum Category {
  ANY = 'ANY',
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

type Problem = {
  id: string
  title: string
  difficulty: Difficulty
  url: string
  topics: string[]
}

export type DailyProblemsResponse = Record<Category, Problem>
