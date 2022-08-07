import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Text } from "rebass";
import { IProblemSet, ITopic } from "../api";
import { Accordion, Pill } from "../components";
import { theme } from "../styles/theme";
import { DifficultyPill } from "./difficulty-pill";

interface ITopicState extends ITopic {
  isSelected: boolean;
}
interface IProblemSetState extends IProblemSet {
  isSelected: boolean;
}

export const Settings = () => {
  const [topics, setTopics] = useState<ITopicState[] | null>(null);
  const [problemSets, setProblemSets] = useState<IProblemSetState[] | null>(
    null
  );

  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([
    "Easy",
    "Medium",
    "Hard",
  ]);

  const getTopics = async () => {
    const topics = await axios.get<ITopic[]>(`${window.origin}/api/topics`);
    const topicsState = topics.data.map((topic) => ({
      ...topic,
      isSelected: true,
    }));
    setTopics(topicsState);
  };

  const getProblemSets = async () => {
    const problemSets = await axios.get<IProblemSet[]>(
      `${window.origin}/api/problem-sets`
    );
    const problemSetsState = problemSets.data.map((problemSet) => ({
      ...problemSet,
      isSelected: false,
    }));
    setProblemSets([
      {
        id: "000",
        name: "All",
        isSelected: true,
      },
      ...problemSetsState,
    ]);
  };

  useEffect(() => {
    getTopics();
    getProblemSets();
  }, []);

  return (
    <>
      <Box as="h2">Filters</Box>

      <Accordion title={"Difficulty"}>
        {["Easy", "Medium", "Hard"].map((difficulty, idx) => (
          <DifficultyPill
            key={idx}
            difficulty={difficulty}
            selectable
            isSelected={difficultyFilter.includes(difficulty) ?? false}
            onSelect={() => {
              let updatedDifficultyFilter;
              if (difficultyFilter?.includes(difficulty)) {
                updatedDifficultyFilter = difficultyFilter?.filter(
                  (diff) => diff !== difficulty
                );
              } else {
                updatedDifficultyFilter = [...difficultyFilter, difficulty];
              }

              setDifficultyFilter(updatedDifficultyFilter);
            }}
          />
        ))}
      </Accordion>

      <Accordion title={"Topics"}>
        {topics &&
          topics.map((topic) => (
            <Pill
              key={topic.id}
              text={topic.name}
              color={theme.colors.grey}
              isSelected={topic.isSelected}
              sx={{ marginY: "2px" }}
              onSelect={() => {}}
            />
          ))}
      </Accordion>
      <Accordion title={"Problem sets"}>
        {problemSets &&
          problemSets.map((problemSet) => (
            <Pill
              key={problemSet.id}
              text={problemSet.name}
              color={theme.colors.grey}
              isSelected={problemSet.isSelected}
              sx={{ marginY: "2px" }}
              onSelect={() => {}}
            />
          ))}
      </Accordion>
    </>
  );
};
