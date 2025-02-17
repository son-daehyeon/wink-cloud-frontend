import { create } from 'zustand/index';
import { persist } from 'zustand/middleware';

interface Type {
  project: string | null;
}

interface Action {
  setProject: (project: string) => void;
}

const initialState: Type = {
  project: null,
};

export const useProjectStore = create(
  persist<Type & Action>(
    (set) => ({
      ...initialState,
      setProject: (project: string) => set({ project }),
    }),
    {
      name: 'project',
    },
  ),
);
