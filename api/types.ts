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
  problem: IProblem | null;
};

export interface ITopic {
  id: string;
  name: string;
  slug: string;
}

export interface IProblemSet {
  id: string;
  name: string;
}
