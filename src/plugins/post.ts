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

export const apiGetPostList = async (payload: GetPostListReq) =>
  PostAPI.get('/posts', { params: payload });

export const apiAddPost = async (payload: AddPostReq) => PostAPI.post('/post', payload);
