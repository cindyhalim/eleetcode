import { createClient } from "@urql/core"

export const client = createClient({
  url: "https://leetcode.com/graphql",
})
