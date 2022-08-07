import React from "react";
import { Pill } from "../components";
import { getDifficultyColor } from "./utils";

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
