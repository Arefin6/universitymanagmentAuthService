import config from "../../../config";
import User from "./user.model"
import { IUser } from "./user.interface"
import { generateUserId } from "./user.utils";

const saveUser = async (user:IUser)=>{
   
  const id = await generateUserId();
  
  user.id = id;

  //default password
  if(!user.password){
    user.password = config.UserDefaultPassword as string;
  }  
  const createdUser = await User.create(user);
  if(!createdUser){
    throw new Error("User Creation failed")
  }
  return createdUser;
}

export default {saveUser}