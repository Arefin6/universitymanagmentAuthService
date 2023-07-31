import { Model, Types } from "mongoose";

export type IUser = {
  id:string,
  role:string,
  password:string,
  student?:Types.ObjectId 
}
export type UserModel = Model<IUser, object>;

