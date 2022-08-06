import type { NextPage } from "next";
import Head from "next/head";
import { Text } from "rebass";
import { theme } from "../styles/theme";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Leetcode Helper</title>
        <meta
          name="description"
          content="Leetcode problem randomizer with timer to get consistent at solving algo problems!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main style={{ maxWidth: "500px", padding: 20 }}>
        <Text as="h1" sx={{ ...theme.heading }}>
          a leet<span style={{ color: "#E8AA14" }}>code</span> a{" "}
          <span style={{ color: "#E8AA14" }}>day</span>
        </Text>
        <div
          style={{
            backgroundColor: "#0D1821",
            fontWeight: 400,
            fontSize: 25,
            height: 40,
            width: 150,
            borderRadius: 5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          settings
        </div>
      </main>
    </>
  );
};

export default Home;
