export interface Post {
  title: string;
  userId: number;
  id: number;
  body: string;
}

export interface ActivePostState {
  post?: Post;
  activeKeyIndex: number;
}
