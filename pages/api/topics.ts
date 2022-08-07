import { NextApiRequest, NextApiResponse } from "next";
import {
  type ITopics,
  type IQuestionTopicTagsQuery,
  client,
  QuestionTopicTags,
} from "../../api";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ITopics[]>
) => {
  if (req.method === "GET") {
    const { data } = await client
      .query<IQuestionTopicTagsQuery>(QuestionTopicTags)
      .toPromise();

    const result = [...(data?.questionTopicTags?.edges ?? [])].map((edge) => ({
      id: edge?.node?.id,
      name: edge?.node?.name,
      slug: edge?.node?.slug,
    }));

    console.log(result);

    res.status(200).json(result);
  }
};

export default handler;
