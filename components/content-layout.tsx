import React from "react";
import { Box } from "rebass";
import { theme } from "../styles/theme";

interface IContentLayoutProps {
  children: React.ReactNode;
}

export const ContentLayout: React.FC<IContentLayoutProps> = ({ children }) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      border: `5px solid ${theme.colors.black}`,
      borderRadius: 20,
      padding: 40,
      overflowY: "scroll",
    }}
  >
    {children}
  </Box>
);
