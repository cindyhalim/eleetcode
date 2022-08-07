import { NextApiRequest, NextApiResponse } from "next";
import {
  type ITopic,
  type IQuestionTopicTagsQuery,
  client,
  QuestionTopicTags,
} from "../../api";

const handler = async (req: NextApiRequest, res: NextApiResponse<ITopic[]>) => {
  if (req.method === "GET") {
    try {
      const { data } = await client
        .query<IQuestionTopicTagsQuery>(QuestionTopicTags)
        .toPromise();

      const result = [...(data?.questionTopicTags?.edges ?? [])].map(
        (edge) => ({
          id: edge?.node?.id,
          name: edge?.node?.name,
          slug: edge?.node?.slug,
        })
      );

      res.status(200).json(result);
    } catch (e) {
      res.status(400);
    }
  } else {
    res.status(500);
  }
};

export default handler;
