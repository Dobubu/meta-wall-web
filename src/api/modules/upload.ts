import { apiUploadImgur } from '@/api/instances/upload';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';

export const postUploadImgur = async (payload: any) => {
  const res = await handleErrorAsync({
    callback: () => apiUploadImgur(payload),
  });

  return res;
};
