import { getPost } from '@/api/modules/post';

export const usePost2 = () => {
  const fetchPost = async (postId: string, onSuccess: any) => {
    const res = await getPost(postId, onSuccess);
    return res;
  };

  return {
    fetchPost,
  };
};
