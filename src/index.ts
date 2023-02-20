import express, { Express } from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import Route from "./routes/route";
const app: Express = express();

app.use(cors());
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(Route);

const port = process.env.PORT;
app.listen(port, async () => {
  await require("./helpers/init_mongoose");
  console.log(`server listening on ${port}`);
});
