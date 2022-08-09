import React, { useCallback, useEffect } from "react";
import { Box } from "rebass";
import { theme } from "../styles/theme";
import { Accordion, Button, ContentLayout, Pill } from "../components";
import type { ProblemData } from "../api";
import { DifficultyPill } from "./difficulty-pill";
import { useStore } from "../core";
import axios from "axios";
import { useTimer } from "./timer-progress";

export const Problem = () => {
  const {
    problem,
    setProblem,
    difficultyFilter,
    topicsFilter,
    problemSetFilter,
    topics,
  } = useStore();
  const { startTimer, resetTimer } = useTimer();

  const getProblem = useCallback(async () => {
    console.log("Fetching problem");
    const requestBody = {
      difficulty: difficultyFilter,
      problemSet: problemSetFilter,
      topics: topics.length === topicsFilter.length ? null : topicsFilter,
    };
    const response = await axios.post<ProblemData>(
      `${window.origin}/api/problem`,
      requestBody
    );
    if (response.data.problem) {
      setProblem(response.data.problem);
    }
  }, [
    difficultyFilter,
    problemSetFilter,
    topicsFilter,
    topics.length,
    setProblem,
  ]);

  useEffect(() => {
    resetTimer();
    getProblem();
  }, []);

  const handleOnClick = () => {
    if (problem && problem?.difficulty) {
      startTimer(problem.difficulty);
    }
  };

  return (
    <ContentLayout>
      {problem ? (
        <>
          <DifficultyPill difficulty={problem.difficulty} />
          <Box
            as="h2"
            sx={{
              marginLeft: "5px",
              marginBottom: [15, 15, 15, 20],
              fontSize: [20, 20, 20, 30],
            }}
          >
            {problem.title}
          </Box>
          <Button onClick={handleOnClick}>
            <a href={problem.url} target="_blank" rel="noreferrer">
              visit problem
            </a>
          </Button>
          <Accordion title="Topics">
            {problem.topicTags.map((topic, idx) => (
              <Pill
                key={idx}
                text={topic}
                color={theme.colors.grey}
                selectable={false}
              />
            ))}
          </Accordion>
          <Accordion title="Preview">
            <Box
              sx={{ width: "100%", wordWrap: "break-word", fontSize: 14 }}
              className="preview"
              dangerouslySetInnerHTML={{ __html: problem.content }}
            />
          </Accordion>
        </>
      ) : null}
    </ContentLayout>
  );
};
