import { NextApiRequest, NextApiResponse } from "next"

import {
  type IProblemSet,
  type IFeaturedQuestionListsQuery,
  client,
  FeaturedQuestionLists,
  IError,
} from "api"

const handler = async (req: NextApiRequest, res: NextApiResponse<IProblemSet[] | IError>) => {
  if (req.method === "GET") {
    try {
      const { data } = await client
        .query<IFeaturedQuestionListsQuery>(FeaturedQuestionLists)
        .toPromise()

      const freeProblemSets = [...(data?.featuredQuestionLists ?? [])]
        .filter((questionList) => !questionList.isPaidOnly)
        .map((questionList) => ({
          id: questionList.publicId,
          name: questionList.name,
        }))

      res.status(200).json(freeProblemSets)
    } catch (e) {
      res.status(400).send({ error: "Failed to get data" })
    }
  } else {
    res.status(500).send({ error: "Failed to get data" })
  }
}

export default handler
