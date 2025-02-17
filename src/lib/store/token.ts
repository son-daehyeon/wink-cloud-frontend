import Api from '@/lib/api';
import { LoginResponse } from '@/lib/api/type/domain/auth';

import { create } from 'zustand/index';
import { persist } from 'zustand/middleware';

interface Type {
  accessToken: string | null;
  refreshToken: string | null;
}

interface Action {
  login: (response: LoginResponse) => Promise<boolean>;
  logout: () => void;
  initialize: () => Promise<boolean>;
}

const initialData: Type = {
  accessToken: null,
  refreshToken: null,
};

export const useTokenStore = create(
  persist<Type & Action>(
    (set, get) => ({
      ...initialData,
      login: ({ accessToken, refreshToken }: LoginResponse) => {
        set({ accessToken, refreshToken });
        return get().initialize();
      },
      logout: () => {
        set({ ...initialData });
        Api.Request.removeToken();
      },
      initialize: async () => {
        const { accessToken, refreshToken } = get();
        if (!accessToken || !refreshToken) return false;
        return Api.Request.setToken(accessToken, refreshToken);
      },
    }),
    {
      name: 'token',
    },
  ),
);
