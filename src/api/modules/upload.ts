import { apiUploadImgur } from '@/api/instances/upload';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';
import { UploadImgurReq } from '@/typings/api/upload';

export const postUploadImgur = async (payload: UploadImgurReq) => {
  const res = await handleErrorAsync({
    callback: () => apiUploadImgur(payload),
  });

  return res;
};
