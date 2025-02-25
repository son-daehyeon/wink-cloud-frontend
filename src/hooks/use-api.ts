import { ReactNode, useState } from 'react';

import { ExternalToast, toast } from 'sonner';

type PromiseData = Omit<ExternalToast, 'description'> & {
  loading: string;
  success: string | ReactNode;
  finally?: () => void | Promise<void>;
};

export function useApi(): [
  boolean,
  (func: () => Promise<unknown>) => void,
  manual: (value: boolean) => void,
] {
  const [isPending, setPending] = useState(false);

  async function start(func: () => Promise<unknown>) {
    setPending(true);

    try {
      await func();
    } catch (e) {
      throw e;
    } finally {
      setPending(false);
    }
  }

  return [isPending, start, setPending];
}

export function useApiWithToast(): [
  boolean,
  (func: () => Promise<unknown>, data: PromiseData) => void,
  manual: (value: boolean) => void,
] {
  const [isPending, setPending] = useState(false);

  async function start(func: () => Promise<unknown>, data: PromiseData) {
    setPending(true);

    try {
      await toast
        .promise(func, {
          error: (e) => e.message,
          ...data,
        })
        .unwrap();
    } catch (e) {
      throw e;
    } finally {
      setPending(false);
    }
  }

  return [isPending, start, setPending];
}
