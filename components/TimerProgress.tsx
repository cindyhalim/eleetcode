import { AnimatePresence, motion } from "framer-motion"
import React from "react"

import { useTimer } from "hooks"
import { Pill } from "shared"
import { theme } from "styles"

export const TimerProgress = () => {
  const { getTimeRemainingText, timeElapsed, getTimeRemainingPercentage } = useTimer()
  const isTimerRunning = timeElapsed !== null
  const timeRemainingText = getTimeRemainingText(timeElapsed)
  const width = getTimeRemainingPercentage(timeElapsed)

  return (
    <AnimatePresence>
      {isTimerRunning && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
