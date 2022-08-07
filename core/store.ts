import create from "zustand";
import { IProblem, IProblemSet, ITopic } from "../api";

type ProblemSetID = string;

export enum Route {
  "FILTERS",
  "TIMER",
  "PROBLEM",
}
interface IState {
  currentRoute: Route;
  problem: IProblem | null;
  topics: ITopic[];
  problemSets: IProblemSet[] | null;
  topicsFilter: string[];
  problemSetFilter: ProblemSetID | null;
  difficultyFilter: string | null;
}

interface IActions {
  setCurrentRoute: (route: Route) => void;
  setProblem: (problem: IProblem) => void;
  setTopics: (topics: ITopic[]) => void;
  setProblemSets: (problemSets: IProblemSet[]) => void;
  setDifficultyFilter: (difficulty: string) => void;
  setProblemSetFilter: (id: ProblemSetID) => void;
  setTopicsFilter: (slug: string) => void;
  clearProblemSetFilter: () => void;
  clearDifficultyFilter: () => void;
  clearTopicsFilter: () => void;
}

interface IStore extends IState, IActions {}

const initialState: IState = {
  currentRoute: Route.FILTERS,
  problem: null,
  topics: [],
  problemSets: null,
  topicsFilter: [],
  problemSetFilter: null,
  difficultyFilter: null,
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
}));
