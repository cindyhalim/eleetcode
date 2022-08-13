import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { IProblemSet, ITopic } from "../api";
import { Accordion, ContentLayout, Pill } from "../components";
import { useStore } from "../core";
import { theme } from "../styles/theme";
import { DifficultyPill } from "./difficulty-pill";
import { Difficulties } from "./utils";

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
    setShowErrorToast,
  } = useStore();

  const getTopics = useCallback(async () => {
    try {
      const topics = await axios.get<ITopic[]>(`${window.origin}/api/topics`);
      setTopics(topics.data);
    } catch {
      setShowErrorToast(true);
    }
  }, [setTopics, setShowErrorToast]);

  const getProblemSets = useCallback(async () => {
    try {
      const problemSets = await axios.get<IProblemSet[]>(
        `${window.origin}/api/problem-sets`
      );
      setProblemSets(problemSets.data);
    } catch {
      setShowErrorToast(true);
    }
  }, [setProblemSets, setShowErrorToast]);

  useEffect(() => {
    if (!topics || !topics.length) {
      getTopics();
    }

    if (!problemSets || !problemSets.length) {
      getProblemSets();
    }
  }, [topics, problemSets, getTopics, getProblemSets]);

  return (
    <ContentLayout title="Filters">
      <Accordion title={"Difficulty"}>
        <AllFilter
          isSelected={!difficultyFilter}
          onSelect={() => clearDifficultyFilter()}
        />
        {Difficulties.map((difficulty, idx) => (
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
    </ContentLayout>
  );
};
