import config from "../../../config";
import User from "./user.model"
import { IUser } from "./user.interface"
//import { generateStudentId } from "./user.utils";
import ApiError from "../../../erros/ApiError";

const saveUser = async (user:IUser)=>{
   
  // const id = await generateStudentId();
  
  // user.id = id;

  //default password
  if(!user.password){
    user.password = config.UserDefaultPassword as string;
  }  
  const createdUser = await User.create(user);
  if(!createdUser){
    throw new ApiError(400,"Failed To create User");
  }
  return createdUser;
}

export const UserService={
  saveUser
}