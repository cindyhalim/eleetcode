import React from "react"
import { Box, Flex, Text } from "rebass"
import { Input, Switch } from "@rebass/forms"

import { Accordion, ContentLayout } from "shared"
import { useStore } from "hooks"
import { theme } from "styles"

import { Difficulties, getDifficultyColor } from "./utils"

export const Timer = () => {
  const {
    timerSettings: { enabled, easy, medium, hard },
    setTimerEnabled,
    setTimerDurationSetting,
  } = useStore()

  const getDuration = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return easy
      case "Medium":
        return medium
      case "Hard":
        return hard
    }
  }

  const getKey = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "easy"
      case "Medium":
        return "medium"
      default:
        return "hard"
    }
  }

  return (
    <ContentLayout title="Timer Settings">
      <Flex
        sx={{
          maxWidth: 300,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box as="h3">Enabled</Box>
        <Switch
          checked={enabled}
          onClick={setTimerEnabled}
          sx={{
            "&[aria-checked=true]": {
              backgroundColor: theme.colors.black,
            },
          }}
        />
      </Flex>
      <Accordion title="Duration">
        {Difficulties.map((difficulty, idx) => (
          <Flex
            key={idx}
            sx={{
              maxWidth: 300,
              justifyContent: "space-between",
              alignItems: "center",
              marginY: 10,
            }}
          >
            <Text>{difficulty}</Text>
            <Input
              value={getDuration(difficulty)}
              sx={{
                textAlign: "center",
                fontFamily: theme.fontFamily,
                fontWeight: "bold",
                maxWidth: 50,
                height: 40,
                borderRadius: 10,
                color: getDifficultyColor(difficulty),
                border: `2px solid ${getDifficultyColor(difficulty)}`,
                outlineOffset: "2px",
                outlineColor: getDifficultyColor(difficulty),
              }}
              onChange={(event) => {
                const value = event.target.value
                const key = getKey(difficulty)
                setTimerDurationSetting(key, value.match(/\d/) && value.length <= 3 ? value : "")
              }}
            />
          </Flex>
        ))}
      </Accordion>
    </ContentLayout>
  )
}
