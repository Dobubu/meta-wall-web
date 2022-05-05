/* eslint-disable no-unused-vars */
export interface Comment {
  name: string;
  photo: string;
  content: string;
  createAt: string;
}

export enum PostType {
  PERSON = 'person',
  GROUP = 'group',
}

export interface Post {
  name: string;
  tags: string[];
  type: PostType;
  image: string;
  photo: string;
  createAt: string;
  content: string;
  likes: number;
  comments: Comment[];
}

export interface User {
  name: string;
  photo: string;
}
