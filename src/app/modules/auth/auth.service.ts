import httpStatus from "http-status";
import ApiError from "../../../erros/ApiError";
import User from "../users/user.model";
import { ILoginUser } from "./auth.interface";

const loginUser = async (payload:ILoginUser)=>{
   
      const{id,password} = payload;

      // check User Exits
      const  userExists = await  User.isUserExits(id);

      if(!userExists){
        throw new ApiError(httpStatus.NOT_FOUND,"User Does Not Exists!");
      }

      if(userExists.password &&!(await User.isPasswordMatched(password,userExists.password))){
        throw new ApiError(httpStatus.UNAUTHORIZED,"Password is InCorrect!");
      }

    //  const result = await AcademicSemester.create(payload);
    //  return result;
  }
  
  export const AuthService={
    loginUser
}