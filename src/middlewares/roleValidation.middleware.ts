import { Request, Response, NextFunction } from "express";

const superAdminValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body.user;

  if (user.role !== 1) {
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

  if (user.role !== 2 && user.role !== 1) {
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

  if (user.role !== 3 && user.role !== 2 && user.role !== 1) {
    return response.status(403).send("Access denied");
  }

  next();
};

export { superAdminValidation, adminValidation, userValidation };
