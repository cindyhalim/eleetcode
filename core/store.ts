import create from "zustand";
import { IProblem, IProblemSet, ITopic } from "../api";

type ProblemSetID = string;

export enum Route {
  "FILTERS",
  "TIMER",
  "PROBLEM",
}

type Minutes = string;
type Seconds = number;

interface ITimerSettings {
  enabled: boolean;
  easy: Minutes;
  medium: Minutes;
  hard: Minutes;
}
interface IState {
  currentRoute: Route;
  problem: IProblem | null;
  topics: ITopic[];
  problemSets: IProblemSet[] | null;
  topicsFilter: string[];
  problemSetFilter: ProblemSetID | null;
  difficultyFilter: string | null;
  timerSettings: ITimerSettings;
  timerDuration: Seconds | null;
  timeElapsed: Seconds | null;
  showErrorToast: boolean;
}

interface IActions {
  setCurrentRoute: (route: Route) => void;
  setProblem: (problem: IProblem | null) => void;
  setTopics: (topics: ITopic[]) => void;
  setProblemSets: (problemSets: IProblemSet[]) => void;
  setDifficultyFilter: (difficulty: string) => void;
  setProblemSetFilter: (id: ProblemSetID) => void;
  setTopicsFilter: (slug: string) => void;
  clearProblemSetFilter: () => void;
  clearDifficultyFilter: () => void;
  clearTopicsFilter: () => void;
  setTimerEnabled: () => void;
  setTimerDurationSetting: (
    difficulty: keyof Omit<ITimerSettings, "enabled">,
    duration: Minutes
  ) => void;
  setTimeElapsed: (time: Seconds) => void;
  setTimerDuration: (time: Seconds) => void;
  resetTimeElapsed: () => void;
  setShowErrorToast: (show: boolean) => void;
}

interface IStore extends IState, IActions {}

const initialState: IState = {
  currentRoute: Route.PROBLEM,
  problem: null,
  topics: [],
  problemSets: null,
  topicsFilter: [],
  problemSetFilter: null,
  difficultyFilter: null,
  timerSettings: {
    enabled: true,
    easy: "20",
    medium: "40",
    hard: "60",
  },
  timeElapsed: null,
  timerDuration: null,
  showErrorToast: false,
};

export const useStore = create<IStore>((set) => ({
  ...initialState,
  setCurrentRoute: (route) => set({ currentRoute: route }),
  setProblem: (problem) => set({ problem }),
  setTopics: (topics) => set({ topics }),
  setProblemSets: (problemSets) => set({ problemSets }),
  setProblemSetFilter: (id) => set({ problemSetFilter: id }),
  clearProblemSetFilter: () => set({ problemSetFilter: null }),
  setDifficultyFilter: (difficulty) => set({ difficultyFilter: difficulty }),
  clearDifficultyFilter: () => set({ difficultyFilter: null }),
  setTopicsFilter: (slug) =>
    set(({ topicsFilter }) =>
      topicsFilter.includes(slug)
        ? { topicsFilter: topicsFilter.filter((topic) => topic !== slug) }
        : { topicsFilter: [...topicsFilter, slug] }
    ),
  clearTopicsFilter: () => set({ topicsFilter: [] }),
  setTimerEnabled: () =>
    set((state) => ({
      timerSettings: {
        ...state.timerSettings,
        enabled: !state.timerSettings.enabled,
      },
    })),
  setTimerDurationSetting: (difficulty, duration) =>
    set((state) => ({
      timerSettings: {
        ...state.timerSettings,
        [difficulty]: duration,
      },
    })),
  setTimeElapsed: (time) => set({ timeElapsed: time }),
  resetTimeElapsed: () => set({ timeElapsed: null }),
  setTimerDuration: (time) => set({ timerDuration: time }),
  setShowErrorToast: (show: boolean) => set({ showErrorToast: show }),
}));
