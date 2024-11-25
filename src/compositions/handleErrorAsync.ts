type AsyncCallback<T, A> = (cb_payload?: A) => Promise<T>;

export const handleErrorAsync = async <T, A>(
  cb: AsyncCallback<T, A>,
  cb_payload?: any,
  failCb?: (error: any) => void,
  finallyCb?: () => void,
) => {
  try {
    // const _cb = cb_payload ? cb(cb_payload) : cb();
    // let res;

    // if (cb_payload) {
    //   res = await cb(cb_payload);
    // } else {
    //   res = await cb();
    // }

    const res = await cb();
    console.log('res: 1', res);
    return res;
  } catch (e: any) {
    console.error(`[ฅ^•ﻌ•^ฅ] API error occurred - ${e.error.statusCode}。`, e.message);
    if (failCb) {
      failCb(e);
    }
    throw e;
  } finally {
    if (finallyCb) {
      finallyCb();
    }
  }
};
