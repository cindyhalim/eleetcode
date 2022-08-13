import axios from "axios"
import React, { useCallback, useEffect } from "react"
import { Box, Text } from "rebass"

import type { ProblemData } from "api"
import { useStore, useTimer } from "hooks"
import { Accordion, Button, ContentLayout, Pill, Loading } from "shared"
import { theme } from "styles"

import { DifficultyPill } from "./DifficultyPill"

export const Problem = () => {
  const {
    problem,
    setProblem,
    difficultyFilter,
    topicsFilter,
    problemSetFilter,
    topics,
    showErrorToast,
    setShowErrorToast,
  } = useStore()
  const { startTimer, resetTimer } = useTimer()

  const getProblem = useCallback(async () => {
    const requestBody = {
      difficulty: difficultyFilter,
      problemSet: problemSetFilter,
      topics: topics.length === topicsFilter.length ? null : topicsFilter,
    }
    const axiosCancel = axios.CancelToken.source()

    try {
      const response = await axios.post<ProblemData>(`${window.origin}/api/problem`, requestBody)
      if (response.data.problem) {
        setProblem(response.data.problem)
      }
    } catch (e) {
      if (!axios.isCancel(e)) {
        setShowErrorToast(true)
      }
    }

    return () => {
      axiosCancel.cancel()
    }
  }, [
    difficultyFilter,
    problemSetFilter,
    topicsFilter,
    topics.length,
    setProblem,
    setShowErrorToast,
  ])

  useEffect(() => {
    if (problem) {
      resetTimer()
    } else {
      getProblem()
    }
  }, [problem])

  const handleOnClick = () => {
    if (problem && problem?.difficulty) {
      startTimer(problem.difficulty)
    }
  }

  return (
    <ContentLayout>
      {problem ? (
        <>
          <DifficultyPill difficulty={problem.difficulty} />
          <Text
            as="h2"
            sx={{
              marginLeft: "5px",
              maxWidth: "800px",
              marginBottom: [15, 15, 15, 20],
              fontSize: [20, 20, 20, 30],
            }}
          >
            {problem.title}
          </Text>
          <Button onClick={handleOnClick}>
            <a href={problem.url} target="_blank" rel="noreferrer">
              visit problem
            </a>
          </Button>
          <Accordion title="Topics">
            {problem.topicTags.map((topic, idx) => (
              <Pill key={idx} text={topic} color={theme.colors.grey} selectable={false} />
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
      ) : showErrorToast ? null : (
        <Loading />
      )}
    </ContentLayout>
  )
}
