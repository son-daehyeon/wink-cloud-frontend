import Project from '@/lib/api/type/schema/project';

import { create } from 'zustand/index';
import { persist } from 'zustand/middleware';

interface Type {
  project: Project | null;
}

interface Action {
  setProject: (project: Project | null) => void;
}

const initialState: Type = {
  project: null,
};

export const useProjectStore = create(
  persist<Type & Action>(
    (set) => ({
      ...initialState,
      setProject: (project: Project | null) => set({ project }),
    }),
    {
      name: 'project',
    },
  ),
);
