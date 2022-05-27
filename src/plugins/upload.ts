import PostAPI from './api';

interface UploadImgurReq {
  files: any;
  type: string;
}

export const apiUploadImgur = async (payload: UploadImgurReq) => {
  let data = new FormData();

  data.append('files', payload.files);
  data.append('type', payload.type);

  return PostAPI.post('/upload/imgur', data);
};
