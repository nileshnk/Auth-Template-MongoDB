import { RequestHandler, Request, Response } from "express";

export const unhandledRequest: RequestHandler = (
  req: Request,
  res: Response
) => {
  res.status(404).send("Page not found!");
};
