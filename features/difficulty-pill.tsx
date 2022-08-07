import React from "react";
import { Pill } from "../components";
import { theme } from "../styles/theme";

interface IDifficultyPillProps {
  difficulty: string;
  selectable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const DifficultyPill: React.FC<IDifficultyPillProps> = ({
  difficulty,
  selectable = false,
  isSelected,
  onSelect,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Medium") return theme.colors.difficulty.medium;
    if (difficulty === "Hard") return theme.colors.difficulty.hard;
    if (difficulty === "Easy") return theme.colors.difficulty.easy;

    return "";
  };

  return (
    <Pill
      text={difficulty}
      color={getDifficultyColor(difficulty)}
      selectable={selectable}
      isSelected={isSelected}
      onSelect={onSelect}
    />
  );
};
