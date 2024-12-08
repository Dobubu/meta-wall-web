import { apiGetMessageList, apiDeleteMessageList } from '@/api/instances/chat';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';
import { timeFormate } from '@/lib/formate';

export const getMessageList = async (payloadOnFinally: any) => {
  const handleGetMessageListSuccess = (resPayload: any) => {
    let _res;

    _res = resPayload.data.map((o: any) => ({
      ...o,
      createdAt: timeFormate(o.createdAt),
    }));

    return _res;
  };

  const res = await handleErrorAsync({
    callback: () => apiGetMessageList(),
    onSuccess: (successRes) => handleGetMessageListSuccess(successRes),
    onFinally: () => payloadOnFinally,
  });
  return res;
};

export const deleteMessageList = async () => {
  const res = await handleErrorAsync({
    callback: () => apiDeleteMessageList(),
  });
  return res;
};
