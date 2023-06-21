import User from "../user.model"
import { IUser } from "./user.interface"

const createUser = async (user:IUser)=>{
  const createdUser = await User.create(user);
  if(!createdUser){
    throw new Error("User Creation failed")
  }
  return createdUser;
}

export default {createUser}