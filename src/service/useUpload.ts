import { reactive } from 'vue';

import { apiUploadImgur } from '@/plugins/upload';

interface UploadFile {
  file: File | null;
  url: String;
  size: Number;
  name: String;
}

export const useUpload = () => {
  const file = reactive<UploadFile>({
    file: null,
    url: '',
    size: 0,
    name: '',
  });

  const onChangeFile = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;

    file.file = target.files[0];
    file.url = URL.createObjectURL(target.files[0]);
    file.size = target.files[0].size;
    file.name = target.files[0].name;
  };

  const uploadFile = async (type = 'post') => {
    const dict = { files: file.file, type };

    const res = await apiUploadImgur(dict);
    return res.data.imgUrl;
  };

  const resetFile = () => {
    file.file = null;
    file.url = '';
    file.size = 0;
    file.name = '';
  };

  return { file, onChangeFile, uploadFile, resetFile };
};
