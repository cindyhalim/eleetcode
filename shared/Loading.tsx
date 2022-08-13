import { motion } from "framer-motion"
import React from "react"
import { Flex } from "rebass"

export const Loading = () => {
  return (
    <Flex
      sx={{
        width: "100%",
        height: "80%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex
        sx={{
          justifyContent: "space-evenly",
          width: "200px",
          height: "500px",
          alignItems: "center",
        }}
      >
        {[0, 0.4, 0.8].map((delay, idx) => (
          <motion.div
            key={idx}
            animate={{ scale: [1.5, 2, 2, 1.5, 1.5] }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
              delay,
            }}
          >
            🍞
          </motion.div>
        ))}
      </Flex>
    </Flex>
  )
}
