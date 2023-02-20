import { ObjectId } from "mongodb";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default IUser;
