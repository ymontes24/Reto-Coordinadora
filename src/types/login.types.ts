export type LoginUser = {
  email: string;
  password: string;
};

export type UserLogged = {
  idusers: number;
  email: string;
  password: string;
  roles: Array<string> | string;
};
