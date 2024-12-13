import type { AxiosResponse } from 'axios';

type AsyncCallback<T, A = void> = (cb_payload?: A) => Promise<AxiosResponse<T>>;

interface HandleErrorAsyncOptions<T, A = void> {
  callback: AsyncCallback<T, A>;
  payload?: any;
  onSuccess?: (result: AxiosResponse<T>) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}

export const handleErrorAsync = async <T, A = void>({
  callback,
  payload,
  onSuccess,
  onError,
  onFinally,
}: HandleErrorAsyncOptions<T, A>) => {
  try {
    // const _cb = cb_payload ? cb(cb_payload) : cb();
    // let res;

    // if (cb_payload) {
    //   res = await cb(cb_payload);
    // } else {
    //   res = await cb();
    // }

    const res = await callback();

    if (onSuccess) {
      return onSuccess(res);
    }

    return res;
  } catch (e: any) {
    console.error(`[ฅ^•ﻌ•^ฅ] API error occurred - ${e.error.statusCode}。`, e.message);
    if (onError) {
      onError(e);
    }
    throw e;
  } finally {
    if (onFinally) {
      onFinally();
    }
  }
};
