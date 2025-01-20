import PostAPI from '@/api';
import { UploadImgurReq } from '@/typings/api/upload';

export const apiUploadImgur = async (payload: UploadImgurReq) => {
  let data = new FormData();

  data.append('files', payload.files);
  data.append('type', payload.type);

  return PostAPI.post('/upload/imgur', data);
};
