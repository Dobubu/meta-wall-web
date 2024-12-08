import { apiGetMessageList, apiDeleteMessageList } from '@/api/instances/chat';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';

export const getMessageList = async () => {
  const res = await handleErrorAsync({
    callback: () => apiGetMessageList(),
  });
  return res;
};

export const deleteMessageList = async () => {
  const res = await handleErrorAsync({
    callback: () => apiDeleteMessageList(),
  });
  return res;
};
