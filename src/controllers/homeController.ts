import { RequestHandler, Request, Response } from "express";
export const home: RequestHandler = (req: Request, res: Response) => {
  res.render("index", {
    name: req.body.tokendata.name,
    id: req.body.tokendata.id,
  });
};
