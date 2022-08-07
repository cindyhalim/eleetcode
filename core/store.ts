import create from "zustand";
import { IProblemSet, ITopic } from "../api";

type ProblemSetID = string;

interface IState {
  topics: ITopic[] | null;
  problemSets: IProblemSet[] | null;
  topicsFilter: string[];
  problemSetsFilter: ProblemSetID | null;
  difficultyFilter: string | null;
}

interface IActions {
  setTopics: (topics: ITopic[]) => void;
  setProblemSets: (problemSets: IProblemSet[]) => void;
  setDifficultyFilter: (difficulty: string) => void;
  setProblemSetsFilter: (id: ProblemSetID) => void;
  setTopicsFilter: (name: string) => void;
  clearProblemSetsFilter: () => void;
  clearDifficultyFilter: () => void;
  clearTopicsFilter: () => void;
}

interface IStore extends IState, IActions {}

const initialState: IState = {
  topics: null,
  problemSets: null,
  topicsFilter: [],
  problemSetsFilter: null,
  difficultyFilter: null,
};

export const useStore = create<IStore>((set) => ({
  ...initialState,
  setTopics: (topics) => set({ topics }),
  setProblemSets: (problemSets) => set({ problemSets }),
  setProblemSetsFilter: (id) => set({ problemSetsFilter: id }),
  clearProblemSetsFilter: () => set({ problemSetsFilter: null }),
  setDifficultyFilter: (difficulty) => set({ difficultyFilter: difficulty }),
  clearDifficultyFilter: () => set({ difficultyFilter: null }),
  setTopicsFilter: (name) =>
    set(({ topicsFilter }) =>
      topicsFilter.includes(name)
        ? { topicsFilter: topicsFilter.filter((topic) => topic !== name) }
        : { topicsFilter: [...topicsFilter, name] }
    ),
  clearTopicsFilter: () => set({ topicsFilter: [] }),
}));
