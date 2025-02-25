import Api from '@/lib/api';
import { LoginResponse } from '@/lib/api/type/domain/auth';

import { create } from 'zustand/index';
import { persist } from 'zustand/middleware';

interface Type {
  accessToken: string | null;
  refreshToken: string | null;
}

interface Action {
  save: (response: LoginResponse) => void;
  login: (response: LoginResponse) => Promise<boolean>;
  logout: () => void;
  initialize: () => Promise<boolean>;
}

const initialState: Type = {
  accessToken: null,
  refreshToken: null,
};

export const useTokenStore = create(
  persist<Type & Action>(
    (set, get) => ({
      ...initialState,
      save: ({ accessToken, refreshToken }: LoginResponse) => set({ accessToken, refreshToken }),
      login: ({ accessToken, refreshToken }: LoginResponse) => {
        set({ accessToken, refreshToken });
        return get().initialize();
      },
      logout: () => {
        set({ ...initialState });
        Api.Request.removeToken();
        window.location.replace(
          `https://wink.kookmin.ac.kr/application/${process.env.NEXT_PUBLIC_WINK_APPLICATION_ID}/oauth?callback=${encodeURIComponent(process.env.NEXT_PUBLIC_WINK_CALLBACK_URL!)}`,
        );
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
