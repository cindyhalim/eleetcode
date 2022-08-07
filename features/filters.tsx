import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box } from "rebass";
import { IProblemSet, ITopic } from "../api";
import { Accordion, Pill } from "../components";
import { useStore } from "../core";
import { theme } from "../styles/theme";
import { DifficultyPill } from "./difficulty-pill";

const AllFilter = ({
  isSelected,
  onSelect,
}: {
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <Pill
    key={"All"}
    text={"All"}
    color={theme.colors.grey}
    isSelected={isSelected}
    sx={{ marginY: "2px" }}
    onSelect={onSelect}
  />
);

export const Filters = () => {
  const {
    topics,
    problemSets,
    setTopics,
    setProblemSets,
    difficultyFilter,
    setDifficultyFilter,
    problemSetFilter,
    setProblemSetFilter,
    clearProblemSetFilter,
    clearDifficultyFilter,
    topicsFilter,
    setTopicsFilter,
    clearTopicsFilter,
  } = useStore();

  const getTopics = async () => {
    const topics = await axios.get<ITopic[]>(`${window.origin}/api/topics`);
    setTopics(topics.data);
  };

  const getProblemSets = async () => {
    const problemSets = await axios.get<IProblemSet[]>(
      `${window.origin}/api/problem-sets`
    );
    setProblemSets(problemSets.data);
  };

  useEffect(() => {
    getTopics();
    getProblemSets();
  }, []);

  return (
    <>
      <Box as="h2">Filters</Box>
      <Accordion title={"Difficulty"}>
        <AllFilter
          isSelected={!difficultyFilter}
          onSelect={() => clearDifficultyFilter()}
        />
        {["Easy", "Medium", "Hard"].map((difficulty, idx) => (
          <DifficultyPill
            key={idx}
            difficulty={difficulty}
            selectable
            isSelected={difficultyFilter === difficulty}
            onSelect={() => {
              setDifficultyFilter(difficulty);
            }}
          />
        ))}
      </Accordion>
      <Accordion title={"Topics"}>
        <AllFilter
          isSelected={!topicsFilter.length}
          onSelect={() => clearTopicsFilter()}
        />
        {topics.map((topic) => (
          <Pill
            key={topic.id}
            text={topic.name}
            color={theme.colors.grey}
            isSelected={topicsFilter.includes(topic.slug)}
            sx={{ marginY: "2px" }}
            onSelect={() => setTopicsFilter(topic.slug)}
          />
        ))}
      </Accordion>
      <Accordion title={"Problem sets"}>
        <AllFilter
          isSelected={!problemSetFilter}
          onSelect={() => clearProblemSetFilter()}
        />
        {problemSets &&
          problemSets.map((problemSet) => (
            <Pill
              key={problemSet.id}
              text={problemSet.name}
              color={theme.colors.grey}
              isSelected={problemSetFilter === problemSet.id}
              sx={{ marginY: "2px" }}
              onSelect={() => {
                setProblemSetFilter(problemSet.id);
              }}
            />
          ))}
      </Accordion>
    </>
  );
};
