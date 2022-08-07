import { motion } from "framer-motion";
import React from "react";
import { Box } from "rebass";
import { theme } from "../styles/theme";

export enum ButtonType {
  "PRIMARY",
  "SECONDARY",
}
interface IButtonProps {
  text: string;
  type?: ButtonType;
  onClick: () => void;
}

export const Button: React.FC<IButtonProps> = ({
  text,
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
          backgroundColor:
            type === ButtonType.PRIMARY
              ? theme.colors.black
              : theme.colors.mustard,
          color: theme.colors.white,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {text}
      </Box>
    </motion.div>
  );
};
