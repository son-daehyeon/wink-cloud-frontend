import { create } from 'zustand';

type Modal =
  | 'setting:theme'
  | 'record:create'
  | 'record:update'
  | 'project:invited'
  | 'project:new'
  | 'project:invite'
  | 'project:instance:delete'
  | 'project:instance:status:start'
  | 'project:instance:status:stop';

interface Type<T = unknown> {
  modal: Modal | null;
  props?: T;
}

interface Action {
  open: <T>(modal: Modal, props?: T) => void;
  close: () => void;
}

const initialState: Type = {
  modal: null,
  props: undefined,
};

export const useModalStore = create<Type & Action>((set) => ({
  ...initialState,
  open: (modal, props) => set({ modal, props }),
  close: () => set({ modal: null }),
}));
