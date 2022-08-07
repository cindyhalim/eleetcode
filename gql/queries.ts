export const TotalProblemsQuery = `
  query problemsetQuestionListTotal($categorySlug: String, $filters: QuestionListFilterInput) {
    problemQuestionlist: questionList(categorySlug: $categorySlug, filters: $filters) {
      total: totalNum
    }
  }
`;
export const ProblemSetQuery = `
  query problemsetQuestionList($categorySlug: String, $limit: Int, $filters: QuestionListFilterInput) {
    problemsetQuestionList: questionList(categorySlug: $categorySlug, limit: $limit, filters: $filters) {
      questions: data {
        frontendQuestionId: questionFrontendId
        paidOnly: isPaidOnly
        titleSlug
        hasSolution
    }
  }
}
`;

export const QuestionDataQuery = `
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionFrontendId
      title
      titleSlug
      content
      difficulty
      categoryTitle
      topicTags {
        name
        slug
      }
    }
  }
`;
