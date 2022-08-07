import React from "react";
import { Box, Text } from "rebass";
import { theme } from "../styles/theme";

interface IContentLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const ContentLayout: React.FC<IContentLayoutProps> = ({
  title,
  children,
}) => (
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
    {title && (
      <Text as="h2" sx={{ marginBottom: 20 }}>
        {title}
      </Text>
    )}
    {children}
  </Box>
);
