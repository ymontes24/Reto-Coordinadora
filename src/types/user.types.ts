export type JwtUser = {
  email: string;
  roles: Array<number> | number;
};

export type User = {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  rolesId: Array<number>;
};

export type UserRoles = {
  email: string;
  rolesId: Array<number>;
};
