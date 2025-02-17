import Project from '@/lib/api/type/schema/project';

import { create } from 'zustand/index';
import { persist } from 'zustand/middleware';

interface Type {
  project: Project | null;
}

interface Action {
  setProject: (project: Project) => void;
}

const initialState: Type = {
  project: null,
};

export const useProjectStore = create(
  persist<Type & Action>(
    (set) => ({
      ...initialState,
      setProject: (project: Project) => set({ project }),
    }),
    {
      name: 'project',
    },
  ),
);
