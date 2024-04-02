export type UserCredetials = {
  username: string;
  password: string;
};

export type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  created: Date;
  accessToken?: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  created: string;
  modified: string;
  userId: number;
  author: User;
};
