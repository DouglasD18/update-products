import { Response, Request, NextFunction } from "express";

export const contentType = (_req: Request, res: Response, next: NextFunction): void => {
  res.type("json");
  next();
}
