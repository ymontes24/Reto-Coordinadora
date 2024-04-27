import { Request, Response, NextFunction } from "express";

const superAdminValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body.user;

  if (user.roles.includes("SuperAdmin") === false) {
    return response.status(403).send("Access denied");
  }

  next();
};

const adminValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body.user;

  if (
    user.roles.includes("Admin") === false &&
    user.roles.includes("SuperAdmin") === false
  ) {
    return response.status(403).send("Access denied");
  }

  next();
};

const userValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body.user;

  if (
    user.roles.includes("User") === false &&
    user.roles.includes("Admin") === false &&
    user.roles.includes("SuperAdmin") === false
  ) {
    return response.status(403).send("Access denied");
  }

  next();
};

export { superAdminValidation, adminValidation, userValidation };
