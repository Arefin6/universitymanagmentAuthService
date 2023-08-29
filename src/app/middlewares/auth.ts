import { NextFunction, Request, Response } from "express";
import ApiError from "../../erros/ApiError";
import httpStatus from "http-status";
import { jwtHelper } from "../../helpers/jwtHelpers";
import config from "../../config";
import { Secret } from "jsonwebtoken";

const auth = (...requiredRoles:string[])=>async(req:Request,res:Response,next:NextFunction)=>{
    try {
      const token = req.headers.authorization;
      if(!token){
        throw new ApiError(httpStatus.UNAUTHORIZED,"You Are Not Authorized To Access");
      } 
       
      const verifiedUser = jwtHelper.verifyToken(token,config.jwt.secret as Secret)
       if(!verifiedUser){
        throw new ApiError(httpStatus.FORBIDDEN,'Invalid Token');
       }
       req.user = verifiedUser;  // role  , userid

       // check with the role
       if(requiredRoles.length >0 && !requiredRoles.includes(verifiedUser.role)){
         throw new ApiError(httpStatus.FORBIDDEN,'Forbiden');
       }
       next()
    } catch (error) {
       next(error) 
    }

}
export default auth;