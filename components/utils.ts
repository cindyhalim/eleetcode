import { theme } from "styles"

export const Difficulties = ["Easy", "Medium", "Hard"]

export const getDifficultyColor = (difficulty: string) => {
  if (difficulty === "Medium") return theme.colors.difficulty.medium
  if (difficulty === "Hard") return theme.colors.difficulty.hard
  if (difficulty === "Easy") return theme.colors.difficulty.easy

  return ""
}
