import User from '@/lib/api/type/schema/user';

import { create } from 'zustand';

interface Type {
  user: User | null;
}

interface Action {
  setUser: (user: User | null) => void;
}

const initialState: Type = {
  user: null,
};

export const useUserStore = create<Type & Action>((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
}));
