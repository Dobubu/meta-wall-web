import {
  apiGetPost,
  apiGetPostList,
  apiGetUserPostsList,
  apiAddPost,
  AddPostReq,
  apiDeletePost,
  apiAddPostLike,
  apiDeletePostLike,
  AddPostComment,
  apiAddPostComment,
} from '@/api/instances/post';
import { usePostStore } from '@/store/post';
import { handleErrorAsync } from '@/compositions/handleErrorAsync';
import { Post } from '@/components/post/type';

export const getPost = async (postId: string, payloadOnSuccess: any) => {
  const { updateLoading } = usePostStore();

  updateLoading('postInfo', true);
  const res = await handleErrorAsync<Post>({
    callback: () => apiGetPost(postId),
    onSuccess: (res) => payloadOnSuccess(res),
    onFinally: () => updateLoading('postInfo', false),
  });

  return res;
};

export const getPostList = async (query = {}) => {
  const { updateLoading } = usePostStore();

  updateLoading('list', true);
  const res = await handleErrorAsync({
    callback: () => apiGetPostList(query),
    onFinally: () => updateLoading('list', false),
  });
  console.log('res: ', res);
  return res;
};

export const getUserPostsList = async (userId: string, query?: any) => {
  const { updateLoading } = usePostStore();

  updateLoading('userWallList', true);
  const res = await handleErrorAsync({
    callback: () => apiGetUserPostsList(userId, query),
    onFinally: () => updateLoading('userWallList', false),
  });
  console.log('res: ', res);
  return res;
};

export const addPost = async (payload: any) => {
  const { updateLoading } = usePostStore();

  updateLoading('add', true);
  const res = await handleErrorAsync({
    callback: () => apiAddPost(payload),
    onFinally: () => updateLoading('add', false),
  });
  console.log('res: ', res);
  return res;
};

export const deletePost = async (postId: string) => {
  const res = await handleErrorAsync({
    callback: () => apiDeletePost(postId),
  });
  console.log('res: ', res);
  return res;
};

export const addPostLike = async (postId: string) => {
  const res = await handleErrorAsync({
    callback: () => apiAddPostLike(postId),
  });
  console.log('res: ', res);
  return res;
};

export const deletePostLike = async (postId: string) => {
  const res = await handleErrorAsync({
    callback: () => apiDeletePostLike(postId),
  });
  console.log('res: ', res);
  return res;
};

export const addPostComment = async (postId: string, payload: AddPostComment) => {
  const { updateLoading } = usePostStore();

  updateLoading('comment', true);
  const res = await handleErrorAsync({
    callback: () => apiAddPostComment(postId, payload),
    onFinally: () => updateLoading('comment', false),
  });
  console.log('res: ', res);
  return res;
};
