import type { NextPage } from "next"
import Head from "next/head"
import { useEffect } from "react"
import { Box, Flex, Text } from "rebass"

import { Button, ButtonType, ErrorToast } from "shared"
import { Route, useStore, useTimer } from "hooks"
import { Problem, Filters, Timer, TimerProgress } from "components"
import { theme } from "styles"

const Home: NextPage = () => {
  const { currentRoute, setCurrentRoute, setProblem, showErrorToast, setShowErrorToast } =
    useStore()

  const { timeElapsed, getTimeRemainingText } = useTimer()
  const timeRemainingText = timeElapsed ? `${getTimeRemainingText(timeElapsed)} - ` : ""

  useEffect(() => {
    if (!timeRemainingText) {
      document.title = document.title
    } else {
      document.title = timeRemainingText + document.title
    }
  }, [timeRemainingText])

  const getContent = (currentRoute: Route) => {
    switch (currentRoute) {
      case Route.PROBLEM:
        return <Problem />
      case Route.TIMER:
        return <Timer />
      default:
        return <Filters />
    }
  }
  return (
    <>
      <Head>
        <title>eleet code</title>
        <meta
          name="description"
          content="random leetcode problem generator with timer to get you consistent at solving algo problems!"
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Flex
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          flexDirection: ["column", "column", "row"],
        }}
      >
        <ErrorToast isVisible={showErrorToast} setIsVisible={setShowErrorToast} />
        <TimerProgress />
        <Flex
          sx={{
            width: "100%",
            maxWidth: ["100%", "100%", "320px"],
            padding: [20, 20, 40],
            justifyContent: "center",
            alignItems: ["center", "center", "flex-start"],
            flexDirection: "column",
          }}
        >
          <Flex
            sx={{
              flexDirection: ["row", "row", "column"],
              marginTop: [40, 40, 0],
            }}
          >
            <Text as="h1" sx={{ ...theme.heading }}>
              \eleet
            </Text>
            <Text
              as="h1"
              sx={{
                ...theme.heading,
                color: theme.colors.mustard,
                marginLeft: 10,
                wordWrap: "break-word",
              }}
            >
              code/
            </Text>
          </Flex>
          <Flex sx={{ marginY: 20, flexDirection: ["row", "row", "column"] }}>
            <Button onClick={() => setCurrentRoute(Route.FILTERS)}>filters</Button>
            <Button onClick={() => setCurrentRoute(Route.TIMER)}>timer</Button>
            <Button
              type={ButtonType.SECONDARY}
              onClick={() => {
                setProblem(null)
                setCurrentRoute(Route.PROBLEM)
              }}
            >
              give me a problem
            </Button>
          </Flex>
        </Flex>
        <Box
          sx={{
            width: "100%",
            padding: [20, 20, 40],
            paddingY: [10, 10, 40],
          }}
        >
          {getContent(currentRoute)}
        </Box>
      </Flex>
    </>
  )
}

export default Home
