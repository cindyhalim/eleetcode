import type { NextApiRequest, NextApiResponse } from "next";
import {
  type HTML,
  type IProblemSetQuery,
  type IQuestionDataQuery,
  type ITotalProblemsQuery,
  client,
  ProblemSetQuery,
  TotalProblemsQuery,
  QuestionDataQuery,
} from "../../gql";

type ProblemUrl = `https://leetcode.com/problems/${string}`;
export interface IProblem {
  id: string;
  title: string;
  difficulty: string; // "Medium" | "Easy" | "Hard";
  url: ProblemUrl;
  content: HTML;
  topicTags: string[];
}

type Data = {
  problem: IProblem | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // since list response is limited by default, we need to get the total problems based on filter
  const { data } = await client
    .query<ITotalProblemsQuery>(TotalProblemsQuery, {
      categorySlug: "",
      filters: {},
    })
    .toPromise();

  const totalProblems = data?.problemQuestionlist?.total || 0;

  if (!totalProblems) {
    return null;
  }

  const problemsList = await client
    .query<IProblemSetQuery>(ProblemSetQuery, {
      categorySlug: "",
      filters: {},
      limit: totalProblems,
    })
    .toPromise();

  // additional filters
  const additionallyFilteredProblemsList = [
    ...(problemsList.data?.problemsetQuestionList?.questions ?? []),
  ].filter((question: any) => !question.paidOnly);

  const randomIndex = Math.floor(
    Math.random() * (additionallyFilteredProblemsList.length - 1)
  );
  const chosenProblem = additionallyFilteredProblemsList[randomIndex];

  const { data: chosenProblemData } = await client
    .query<IQuestionDataQuery>(QuestionDataQuery, {
      titleSlug: chosenProblem.titleSlug,
    })
    .toPromise();

  const topicTags = [...(chosenProblemData?.question?.topicTags ?? [])].map(
    (tag: any) => tag.name
  );

  const problem: IProblem = {
    id: chosenProblemData?.question.questionFrontendId || "",
    title: chosenProblemData?.question.title || "",
    difficulty: chosenProblemData?.question.difficulty || "",
    url: `https://leetcode.com/problems/${chosenProblemData?.question?.titleSlug}`,
    content: chosenProblemData?.question.content || "",
    topicTags,
  };

  res.status(200).json({ problem });
};

export default handler;
