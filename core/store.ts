import create from "zustand";
import { IProblemSet, ITopic } from "../api";

type ProblemSetID = string;

interface IState {
  topics: ITopic[];
  problemSets: IProblemSet[] | null;
  topicsFilter: string[];
  problemSetFilter: ProblemSetID | null;
  difficultyFilter: string | null;
}

interface IActions {
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
  topics: [],
  problemSets: null,
  topicsFilter: [],
  problemSetFilter: null,
  difficultyFilter: null,
};

export const useStore = create<IStore>((set) => ({
  ...initialState,
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
