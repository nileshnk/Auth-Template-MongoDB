import JWT, { Secret, JwtPayload } from "jsonwebtoken";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { createDecipheriv } from "crypto";
let JWT_SECRET: Secret;
let ENCRYPT_KEY: string;
let IV: string;
if (
  process.env.ENCRYPT_KEY &&
  process.env.JWT_SECRET &&
  process.env.IV !== undefined
) {
  ENCRYPT_KEY = process.env.ENCRYPT_KEY;
  JWT_SECRET = process.env.JWT_SECRET;
  IV = process.env.IV;
} else {
  throw new Error("Required keys not available in .env file");
}

export const auth: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // decipher cookies
    let cookieKey: Array<string> = Object.keys(req.cookies);
    let cookieVal: Array<string> = Object.values(req.cookies);

    if (cookieKey.length === 0) {
      throw new Error("No cookies found in the request");
    }
    let authKey: string = cookieKey[0];
    let authVal: string = cookieVal[0];

    const decipher = createDecipheriv("aes-256-gcm", ENCRYPT_KEY, IV);
    const decAuthKey = decipher.update(authKey, "hex", "utf8");
    const decAuthVal = decipher.update(authVal, "hex", "utf8");

    //check jwt tokens
    if (decAuthKey !== "Authorization") {
      throw new Error("Token not found");
    }
    const authToken = decAuthVal.split(" ")[1];
    const decodedJWT = JWT.verify(authToken, JWT_SECRET);

    req.body.tokendata = decodedJWT;
    next();
  } catch (err: any) {
    console.log(err.message);
    res.json(err.message);
  }
};
