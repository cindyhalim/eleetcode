import React from "react";
import { Box, Flex } from "rebass";
import { theme } from "../styles/theme";
import { Accordion, Button, Pill } from "../components";
import type { IProblem } from "../api";

export const Problem: React.FC<IProblem> = ({
  title,
  difficulty,
  topicTags,
  content: preview,
  url,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Medium") return theme.colors.difficulty.medium;
    if (difficulty === "Hard") return theme.colors.difficulty.hard;
    if (difficulty === "Easy") return theme.colors.difficulty.easy;

    return "";
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: `5px solid ${theme.colors.black}`,
        borderRadius: 20,
        padding: 40,
        overflowY: "scroll",
      }}
    >
      <Flex sx={{ marginY: 15, alignItems: "center" }}>
        <Pill
          text={difficulty}
          color={getDifficultyColor(difficulty)}
          selectable={false}
        />
        <Box as="h3" sx={{ marginLeft: "5px" }}>
          {title}
        </Box>
      </Flex>

      <Button onClick={() => null}>
        <a href={url} target="_blank" rel="noreferrer">
          visit problem
        </a>
      </Button>
      <Accordion title="Topics">
        {topicTags.map((topic, idx) => (
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
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      </Accordion>
    </Box>
  );
};
