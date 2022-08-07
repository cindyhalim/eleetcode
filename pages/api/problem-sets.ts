import { NextApiRequest, NextApiResponse } from "next";
import {
  type IProblemSet,
  type IFeaturedQuestionListsQuery,
  client,
  FeaturedQuestionLists,
} from "../../api";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IProblemSet[]>
) => {
  if (req.method === "GET") {
    try {
      const { data } = await client
        .query<IFeaturedQuestionListsQuery>(FeaturedQuestionLists)
        .toPromise();

      console.log(data?.featuredQuestionLists);
      const freeProblemSets = [...(data?.featuredQuestionLists ?? [])]
        .filter((questionList) => !questionList.isPaidOnly)
        .map((questionList) => ({
          id: questionList.publicId,
          name: questionList.name,
        }));

      res.status(200).json(freeProblemSets);
    } catch (e) {
      res.status(400);
    }
  } else {
    res.status(500);
  }
};

export default handler;
