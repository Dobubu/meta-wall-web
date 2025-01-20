export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}

export interface GetPostListReq {
  sort?: string;
  q?: SortType;
}

export interface AddPostReq {
  user: string;
  tags: string[];
  type: string;
  image?: string;
  content: string;
}

export type GetUserPostListReq = GetPostListReq;

export interface AddPostCommentReq {
  comment: string;
}
