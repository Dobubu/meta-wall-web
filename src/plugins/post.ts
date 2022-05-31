import PostAPI from './api';

export interface GetPostListReq {
  sort?: string;
  q?: SortType;
}

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}

export interface AddPostReq {
  user: string;
  tags: string[];
  type: string;
  image?: string;
  content: string;
}

type GetUserPostListReq = GetPostListReq;

export interface AddPostComment {
  comment: string;
}

export const apiGetPostList = async (payload: GetPostListReq) =>
  PostAPI.get('/posts', { params: payload });

export const apiGetPost = async (postId: string) => PostAPI.get(`/post/${postId}`);

export const apiGetUserPostsList = async (userId: string, payload: GetUserPostListReq) =>
  PostAPI.get(`/posts/user/${userId}`, { params: payload });

export const apiAddPost = async (payload: AddPostReq) => PostAPI.post('/post', payload);

export const apiDeletePost = async (postId: string) => PostAPI.delete(`/post/${postId}`);

export const apiAddPostLike = async (postId: string) => PostAPI.post(`/post/${postId}/like`);

export const apiDeletePostLike = async (postId: string) => PostAPI.delete(`/post/${postId}/like`);

export const apiAddPostComment = async (postId: string, payload: AddPostComment) =>
  PostAPI.post(`/post/${postId}/comment`, payload);
