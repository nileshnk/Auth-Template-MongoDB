import { Schema, model } from "mongoose";
import IUser from "../interface/UserInterface";
import { ObjectId } from "mongodb";

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.set("timestamps", true);

const UserModel = model<IUser>("user", UserSchema);

export default UserModel;
