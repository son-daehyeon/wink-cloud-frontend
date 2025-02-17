import User from '@/lib/api/type/schema/user';

import { create } from 'zustand';

interface Type {
  user: User | null;
}

interface Action {
  setUser: (user: User | null) => void;
}

type UserStore = Type & Action;

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
