type AsyncCallback<T, A> = (cb_payload?: A) => Promise<T>;

type HandleErrorAsyncOptions<T, A> = {
  callback: AsyncCallback<T, A>;
  payload?: any;
  onError?: (error: any) => void;
  onFinally?: () => void;
};

export const handleErrorAsync = async <T, A>({
  callback,
  payload,
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
    console.log('res: 1', res);
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
