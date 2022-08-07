import React, { useEffect, useState } from "react";
import { Box, Flex } from "rebass";
import { theme } from "../styles/theme";
import { Accordion, Button, ContentLayout, Pill } from "../components";
import type { IProblem, ProblemData } from "../api";
import { DifficultyPill } from "./difficulty-pill";
import { useStore } from "../core";
import axios from "axios";

export const Problem = () => {
  const {
    problem,
    setProblem,
    difficultyFilter,
    topicsFilter,
    problemSetFilter,
    topics,
  } = useStore();

  const getProblem = async () => {
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
  };

  useEffect(() => {
    getProblem();
  }, []);

  return (
    <ContentLayout>
      {problem ? (
        <>
          <Flex sx={{ marginY: 15, alignItems: "center" }}>
            <DifficultyPill difficulty={problem.difficulty} />
            <Box as="h2" sx={{ marginLeft: "5px" }}>
              {problem.title}
            </Box>
          </Flex>

          <Button onClick={() => null}>
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
