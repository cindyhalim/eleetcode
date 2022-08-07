import axios from "axios";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Box, Flex, Text } from "rebass";
import type { IProblem, ProblemData } from "../api";
import { Button, ButtonType } from "../components";
import { Problem } from "../features";
import { theme } from "../styles/theme";

const Home: NextPage = () => {
  const [data, setData] = useState<IProblem | null>(null);
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
            maxWidth: ["100%", "100%", data ? "500px" : "100%"],
            padding: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: data ? "flex-start" : "center",
            flexDirection: "column",
          }}
        >
          <Text as="h1" sx={{ ...theme.heading }}>
            a leet<span style={{ color: theme.colors.mustard }}>code</span> a{" "}
            <span style={{ color: theme.colors.mustard }}>day</span>
          </Text>
          <Button onClick={() => null}>settings</Button>
          <Button
            type={ButtonType.SECONDARY}
            onClick={async () => {
              const response = await axios.get<ProblemData>(
                `${window.origin}/api/problem`
              );
              if (response.data.problem) {
                setData(response.data.problem);
              }
            }}
          >
            give me a problem
          </Button>
        </Box>
        <AnimatePresence>
          {data && (
            <Box sx={{ width: "100%", padding: 40 }}>
              <Problem {...data} />
            </Box>
          )}
        </AnimatePresence>
      </Flex>
    </>
  );
};

export default Home;
