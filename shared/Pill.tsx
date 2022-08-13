import React from "react"
import { Box, SxStyleProp } from "rebass"

import { theme } from "styles"

interface IPillProps {
  color: string
  text: string
  selectable?: boolean
  isSelected?: boolean
  onSelect?: () => void
  sx?: SxStyleProp
}

export const Pill: React.FC<IPillProps> = ({
  selectable = true,
  isSelected,
  color,
  text,
  sx,
  onSelect,
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
  }

  return (
    <Box
      as={"span"}
      sx={{
        display: "inline-block",
        cursor: "default",
        border: 0,
        paddingY: "5px",
        paddingX: 10,
        borderRadius: 20,
        backgroundColor: color,
        color: theme.colors.white,
        fontSize: [12, 12, 12, 14],
        marginRight: "5px",
        marginY: "5px",
        ...(selectable && selectableProps),
        ...sx,
      }}
      onClick={onSelect}
    >
      {text}
    </Box>
  )
}
