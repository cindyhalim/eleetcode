import { motion } from "framer-motion"
import React from "react"
import { Box } from "rebass"

import { theme } from "styles"

export enum ButtonType {
  "PRIMARY",
  "SECONDARY",
}
interface IButtonProps {
  children: React.ReactNode
  type?: ButtonType
  onClick: () => void
}

export const Button: React.FC<IButtonProps> = ({
  children,
  type = ButtonType.PRIMARY,
  onClick,
}) => {
  return (
    <motion.div whileHover={{ opacity: 0.8 }}>
      <Box
        as={"button"}
        onClick={onClick}
        sx={{
          ...theme.button,
          backgroundColor: type === ButtonType.PRIMARY ? theme.colors.black : theme.colors.mustard,
          color: theme.colors.white,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {children}
      </Box>
    </motion.div>
  )
}
