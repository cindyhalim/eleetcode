import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { Box, Flex, Text } from "rebass";
import { Button, ButtonType, ContentLayout } from "../components";
import { Route, useStore } from "../core";
import { Problem, Filters } from "../features";
import { theme } from "../styles/theme";

const Home: NextPage = () => {
  const { currentRoute, setCurrentRoute } = useStore();

  const getContent = (currentRoute: Route) => {
    switch (currentRoute) {
      case Route.PROBLEM:
        return <Problem />;
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

      <Flex sx={{ height: "100vh", width: "100%" }}>
        <Box
          sx={{
            width: ["100%", "100%", "100%"],
            maxWidth: ["100%", "100%", "500px"],
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Text as="h1" sx={{ ...theme.heading }}>
            a leet<span style={{ color: theme.colors.mustard }}>code</span> a{" "}
            <span style={{ color: theme.colors.mustard }}>day</span>
          </Text>
          <Box sx={{ marginY: 20 }}>
            <Button onClick={() => setCurrentRoute(Route.FILTERS)}>
              filters
            </Button>
            <Button onClick={() => setCurrentRoute(Route.TIMER)}>timer</Button>
            <Button
              type={ButtonType.SECONDARY}
              onClick={() => setCurrentRoute(Route.PROBLEM)}
            >
              give me a problem
            </Button>
          </Box>
        </Box>
        <AnimatePresence>
          <Box sx={{ width: "100%", padding: 40 }}>
            <ContentLayout>{getContent(currentRoute)}</ContentLayout>
          </Box>
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default Home;
