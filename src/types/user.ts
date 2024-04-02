export type UserCredetials = {
  username: string;
  password: string;
};

export type User = UserCredetials & {
  firstName: string;
  lastName: string;
};
