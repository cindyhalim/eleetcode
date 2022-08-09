import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Flex, Text } from "rebass";
import { Button, ButtonType } from "../components";
import { Route, useStore } from "../core";
import { Problem, Filters, Timer, TimerProgress } from "../features";
import { theme } from "../styles/theme";

const Home: NextPage = () => {
  const { currentRoute, setCurrentRoute, setProblem } = useStore();

  const getContent = (currentRoute: Route) => {
    switch (currentRoute) {
      case Route.PROBLEM:
        return <Problem />;
      case Route.TIMER:
        return <Timer />;
      default:
        return <Filters />;
    }
  };
  return (
    <>
      <Head>
        <title>Leetcode Helper</title>
        <meta
          name="description"
          content="Leetcode problem randomizer with timer to get consistent at solving algo problems!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          flexDirection: ["column", "column", "row"],
        }}
      >
        <TimerProgress />
        <Flex
          sx={{
            width: "100%",
            maxWidth: ["100%", "100%", "450px"],
            padding: [20, 20, 40],
            justifyContent: "center",
            alignItems: ["center", "center", "flex-start"],
            flexDirection: "column",
          }}
        >
          <Text as="h1" sx={{ ...theme.heading, marginTop: [40, 40, 0] }}>
            a leet<span style={{ color: theme.colors.mustard }}>code</span> a{" "}
            <span style={{ color: theme.colors.mustard }}>day</span>
          </Text>
          <Flex sx={{ marginY: 20, flexDirection: ["row", "row", "column"] }}>
            <Button onClick={() => setCurrentRoute(Route.FILTERS)}>
              filters
            </Button>
            <Button onClick={() => setCurrentRoute(Route.TIMER)}>timer</Button>
            <Button
              type={ButtonType.SECONDARY}
              onClick={() => {
                setProblem(null);
                setCurrentRoute(Route.PROBLEM);
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
  );
};

export default Home;
