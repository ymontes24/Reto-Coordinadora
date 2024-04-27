export type JwtUser = {
  email: string;
  roles: Array<string> | string;
};

export type User = {
  name: string;
  lastName: string;
  email: string;
  rolesId: Array<string>;
};
