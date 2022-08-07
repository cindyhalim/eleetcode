import { HTML } from "./gql";

type ProblemUrl = `https://leetcode.com/problems/${string}`;
export interface IProblem {
  id: string;
  title: string;
  difficulty: string; // "Medium" | "Easy" | "Hard";
  url: ProblemUrl;
  content: HTML;
  topicTags: string[];
}

export type ProblemData = {
  problem?: IProblem | null;
  error?: string;
};

export interface ITopics {
  id: string;
  name: string;
  slug: string;
}
