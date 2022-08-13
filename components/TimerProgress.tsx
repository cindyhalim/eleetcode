import { motion } from "framer-motion"
import React from "react"
import { Box } from "rebass"

import { useTimer } from "hooks"
import { Pill } from "shared"
import { theme } from "styles"

export const TimerProgress = () => {
  const { getTimeRemainingText, timeElapsed, getTimeRemainingPercentage } = useTimer()
  const isTimerRunning = timeElapsed !== null
  const timeRemainingText = getTimeRemainingText(timeElapsed)
  const width = getTimeRemainingPercentage(timeElapsed)

  return isTimerRunning ? (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        width: "100%",
      }}
    >
      <motion.div
        layout
        style={{
          width,
          height: 10,
          backgroundColor: theme.colors.black,
        }}
      />
      <Pill
        text={`⏱ ${timeRemainingText}`}
        color={theme.colors.black}
        selectable={false}
        sx={{ marginY: 10, marginLeft: 10 }}
      />
    </Box>
  ) : null
}
