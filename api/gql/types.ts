export type HTML = string;

export interface ITotalProblemsQuery {
  problemQuestionlist: {
    total: number;
  };
}

export interface IProblemSetQuery {
  problemsetQuestionList: {
    questions: {
      questionFrontendId: string;
      paidOnly: boolean;
      titleSlug: string;
      hasSolution: boolean;
    }[];
  };
}

export interface IQuestionDataQuery {
  question: {
    questionFrontendId: string;
    title: string;
    titleSlug: string;
    content: HTML;
    difficulty: string;
    categoryTitle: string;
    topicTags: { name: string; slug: string }[];
  };
}

export interface IQuestionTopicTagsQuery {
  questionTopicTags: {
    edges: {
      node: {
        id: string;
        name: string;
        slug: string;
      };
    }[];
  };
}
