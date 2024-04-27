import { JwtUser } from "./user.types";

export type LoginUser = {
  email: string;
  password: string;
};

export type UserLogged = JwtUser & {
  password: string;
};
