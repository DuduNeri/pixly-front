export interface User {
  id: string;
  name: string;
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
  };
  createdAt?: string;

}
export type CreatePost = {
  title?: string;          
  contentText: string;
  contentImage?: string | null;
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
