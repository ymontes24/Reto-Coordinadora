import { User } from "./user.types";

export type LoginUser = {
  email: string;
  password: string;
};

export type UserLogged = User & {
  password: string;
};
