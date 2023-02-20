import { Router } from "express";
import {
  UserLogin,
  UserSignup,
  getLogin,
  getSignup,
  logout,
} from "../controllers/loginController";
import { auth } from "../middlewares/jwt_verification";
import { home } from "../controllers/homeController";
import { unhandledRequest } from "../controllers/unhandled.route";

const Route = Router();

Route.route("/").get(auth, home);
Route.route("/login").get(getLogin).post(UserLogin);
Route.route("/signup").get(getSignup).post(UserSignup);
Route.route("/logout").post(logout);

Route.route("/*").get(unhandledRequest);
export default Route;
