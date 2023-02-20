import { RequestHandler, Request, Response } from "express";
import * as argon2 from "argon2";
import JWT, { Secret } from "jsonwebtoken";
import { createCipheriv, createDecipheriv } from "crypto";
import { UserLoginSchema, UserRegisterSchema } from "../schema/JoiSchema";
import UserModel from "../models/User";

//Initializing all the Secret Keys from .env
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

export const getLogin: RequestHandler = (req: Request, res: Response) => {
  res.render("login");
};
export const UserLogin: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userData = req.body;

  try {
    //Joi Validation
    const validate = UserLoginSchema.validate(userData);
    if (validate.error !== undefined) {
      throw new Error(`${validate.error}`);
    }

    //Search User
    const userFind = await UserModel.findOne({ email: userData.email });
    if (!userFind) {
      return res.json({ status: "false", message: "Invalid Credentials" });
    } else {
      //Verify password
      const verify = await argon2.verify(userFind.password, userData.password);
      if (!verify) {
        return res.json({ status: "false", message: "Invalid Credentials" });
      } else {
        //sending jwt token!
        const token = JWT.sign(
          {
            id: userFind.id,
            name: userFind.firstName + " " + userFind.lastName,
          },
          JWT_SECRET,
          {
            expiresIn: "2 days",
          }
        );

        const cipher = createCipheriv("aes-256-gcm", ENCRYPT_KEY, IV);
        const encKey = cipher.update("Authorization", "utf-8", "hex");
        const encVal = cipher.update(`Bearer ${token}`, "utf-8", "hex");

        res.setHeader(
          "Set-Cookie",
          `${encKey}=${encVal};Max-Age=864000;SameSite;HttpOnly`
        );

        // if you don't want to encrypt token, remove above code and replace with below code.
        // res.setHeader(
        //   "Set-Cookie",
        //   `Authorization=Bearer ${token};Max-Age=864000;SameSite;HttpOnly`
        // );

        console.log(`User logged in: ${userFind.firstName}`);
        return res.json({ status: "true", message: "Login Success" });
      }
    }
  } catch (err: any) {
    console.log(err.message);
    return res.json({ status: "false", message: err.message });
  }
};

export const getSignup: RequestHandler = (req: Request, res: Response) => {
  res.render("signup");
};

export const UserSignup: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const userData = req.body;
  try {
    //Joi Validation
    const validate = UserRegisterSchema.validate(userData);
    if (validate.error !== undefined) {
      throw new Error(`${validate.error}`);
    }
    //hash password
    const hash = await argon2.hash(userData.password);
    userData.password = hash;
    delete userData.confirmPassword;

    //store in database
    await UserModel.create(userData);
    res.json({ status: true, message: "User Created" });
  } catch (err: any) {
    console.log("Error creating!", err.message);
    if (err.code === 11000) {
      return res.json({ status: "false", message: "User Already Exists" });
    }
    return res.send({ status: "false", message: err.message });
  }
};

export const logout: RequestHandler = (req: Request, res: Response) => {
  const authCookieKey = Object.keys(req.cookies)[0];
  res.clearCookie(authCookieKey);
  res.redirect("/");
};
