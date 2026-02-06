export interface User {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  contentText: string;
  contentImage?: string | null;
  userId: string;
  createdAt: string;
  user: User; 
}
