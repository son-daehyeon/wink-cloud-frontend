import { create } from 'zustand/index';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Type {
  first: boolean;
}

interface Action {
  started: () => void;
}

const initialData: Type = {
  first: true,
};

export const useSplashStore = create(
  persist<Type & Action>(
    (set) => ({
      ...initialData,
      started: () => set({ first: false }),
    }),
    {
      name: 'splash',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
