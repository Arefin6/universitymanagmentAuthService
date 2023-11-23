/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type IUser = {
  id:string,
  role:string,
  password:string,
  needsPasswordChange?:boolean,
  student?:Types.ObjectId,
  passwordChangedAt?:Date
}
export type UserModel = {
   isUserExits(id:string):Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
   isPasswordMatched(
    givenPassword:string,
    savedPassword:string):Promise<boolean>;
}& Model<IUser>;

