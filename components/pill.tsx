import React from "react";
import { Box } from "rebass";
import { theme } from "../styles/theme";

interface IPillProps {
  selectable?: boolean;
  isSelected?: boolean;
  color: string;
  text: string;
}

export const Pill: React.FC<IPillProps> = ({
  selectable = true,
  isSelected,
  color,
  text,
}) => {
  const selectableProps = {
    ":hover": {
      backgroundColor: color,
      color: theme.colors.white,
      opacity: 0.8,
    },
    cursor: "pointer",
    backgroundColor: isSelected ? color : theme.colors.white,
    color: isSelected ? theme.colors.white : color,
    border: `2px solid ${color}`,
  };
  return (
    <Box
      as={"span"}
      sx={{
        cursor: "default",
        border: 0,
        paddingY: "5px",
        paddingX: 10,
        borderRadius: 20,
        backgroundColor: color,
        color: theme.colors.white,
        fontSize: [10, 12, 14],
        marginRight: "5px",
        ...(selectable && selectableProps),
      }}
    >
      {text}
    </Box>
  );
};
