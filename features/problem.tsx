import React from "react";
import { Box, Flex } from "rebass";
import { theme } from "../styles/theme";
import { Accordion, Button, Pill } from "../components";
import type { IProblem } from "../api";
import { DifficultyPill } from "./difficulty-pill";

export const Problem: React.FC<IProblem> = ({
  title,
  difficulty,
  topicTags,
  content: preview,
  url,
}) => (
  <>
    <Flex sx={{ marginY: 15, alignItems: "center" }}>
      <DifficultyPill difficulty={difficulty} />
      <Box as="h2" sx={{ marginLeft: "5px" }}>
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
  </>
);
