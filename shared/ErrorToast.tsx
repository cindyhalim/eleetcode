import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import { Box, Text } from "rebass"

import { theme } from "styles"

interface IErrorToastProps {
  isVisible: boolean
  setIsVisible: (show: boolean) => void
}
export const ErrorToast: React.FC<IErrorToastProps> = ({ isVisible, setIsVisible }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 20,
        zIndex: 1,
        width: ["80%", "80%", "50%"],
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial="hide"
            animate="show"
            exit="hide"
            variants={{
              show: { opacity: 1 },
              hide: { opacity: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onAnimationComplete={() => setTimeout(() => setIsVisible(false), 4000)}
          >
            <Box
              sx={{
                minHeight: "50px",
                width: "100%",
                marginBottom: 30,
                padding: 10,
                marginLeft: 20,
                borderLeft: `5px solid ${theme.colors.error}`,
                bg: theme.colors.errorLight,
                borderRadius: 5,
              }}
            >
              <Text sx={{ color: "#fc4747", fontWeight: "bold" }}>Something went wrong!</Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
