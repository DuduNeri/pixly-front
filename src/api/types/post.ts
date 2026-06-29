export interface User {
  id: string;
  name: string;
}

export interface PostAttributes {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  comments: string[];
  userId: string;
}

export interface Post {
  id: string;
  title: string;
  contentText: string;
  contentImage: string | null;
  contentImageUrl?: string | null;
  userId: string;
  user?: {
    name: string;
    id: string;
    avatar: string;
  };
  createdAt?: string;
  comments?: string;
  likesCount?: number;
  liked?: boolean;
}
export type CreatePost = {
  title?: string;
  contentText: string;
  contentImage?: string | null;
};

export type CreateCommentDTO = {
  content: string;
  postId: string;
  userId: string;
};

export interface IPosts {
  id: string;
  title?: string;
  contentText?: string | null;
  contentImage?: string | null;
  contentImageUrl?: string | null;
  comments: string[];
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdatePhoto {
  userId: string;
  avatar: string;
}

export type GetCommentDTO = {
  id: string;
  content: string;
  postId: string;
  userId: string;
};