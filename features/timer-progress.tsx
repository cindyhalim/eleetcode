import React, { useEffect, useState } from "react";
import { Box } from "rebass";
import { Duration } from "luxon";
import { Pill } from "../components";
import { useStore } from "../core";
import { theme } from "../styles/theme";
import { motion } from "framer-motion";

const ONE_SECOND = 1000;
const AUDIO_URL = "/sounds/tone.wav";

export const useTimer = () => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const {
    timerSettings,
    timeElapsed,
    setTimeElapsed,
    resetTimeElapsed,
    timerDuration,
    setTimerDuration,
  } = useStore();

  const getDuration = (difficulty: string) => {
    const { easy, medium, hard } = timerSettings;
    switch (difficulty) {
      case "Medium":
        return medium;
      case "Hard":
        return hard;
      default:
        return easy;
    }
  };

  const startTimer = (problemDifficulty: string) => {
    const { enabled } = timerSettings;

    if (!enabled) {
      return;
    }

    const startingDurationInSec = parseInt(getDuration(problemDifficulty)) * 60;
    setTimeElapsed(startingDurationInSec);
    setTimerDuration(startingDurationInSec);
  };

  const resetTimer = () => {
    const { enabled } = timerSettings;

    if (enabled) {
      resetTimeElapsed();
    }
  };

  const getTimeRemainingText = (timeElapsed: number | null) => {
    if (timeElapsed === null) {
      return "";
    }

    if (timeElapsed === 0) {
      return "time's up!";
    }

    const formattedTimeRemaining = Duration.fromObject({
      seconds: timeElapsed,
    }).toFormat("mm:ss");

    return `${formattedTimeRemaining} remaining`;
  };

  const getTimeRemainingPercentage = (timeElapsed: number | null) => {
    if (timeElapsed === null || timerDuration === null) {
      return "0%";
    }
    const durationInSec = timerDuration;
    const diff = timeElapsed >= 0 ? durationInSec - timeElapsed : 0;
    const percentage = Math.round((diff / durationInSec) * 100);
    return `${percentage}%`;
  };

  useEffect(() => {
    const isTimerRunning = timeElapsed && timeElapsed >= 0;

    if (isTimerRunning) {
      const timer = setInterval(() => {
        const currentTimeRemaining = (timeElapsed as number) - 1;
        setTimeElapsed(currentTimeRemaining);
      }, ONE_SECOND);

      return () => clearInterval(timer);
    }
  }, [timeElapsed, setTimeElapsed]);

  useEffect(() => {
    setAudio(new Audio(AUDIO_URL));
  }, []);

  useEffect(() => {
    if (audio && timeElapsed === 0) {
      audio.play();
    }
  }, [timeElapsed, audio]);

  return {
    timeElapsed,
    startTimer,
    resetTimer,
    getTimeRemainingText,
    getTimeRemainingPercentage,
  };
};

export const TimerProgress = () => {
  const { getTimeRemainingText, timeElapsed, getTimeRemainingPercentage } =
    useTimer();
  const isTimerRunning = timeElapsed !== null;
  const timeRemainingText = getTimeRemainingText(timeElapsed);
  const width = getTimeRemainingPercentage(timeElapsed);

  return isTimerRunning ? (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        width: "100%",
      }}
    >
      <motion.div
        layout
        style={{
          width,
          height: 10,
          backgroundColor: theme.colors.black,
        }}
      />
      <Pill
        text={`⏱ ${timeRemainingText}`}
        color={theme.colors.black}
        selectable={false}
        sx={{ marginY: 10, marginLeft: 10 }}
      />
    </Box>
  ) : null;
};
