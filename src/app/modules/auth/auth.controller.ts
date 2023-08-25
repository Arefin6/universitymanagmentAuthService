import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import config from "../../../config";
import { ILoginUserResponse } from "./auth.interface";

const loginUser = catchAsync(
    async(req:Request,res:Response) =>{
      const {...loginData} = req.body;
       const result = await AuthService.loginUser(loginData);
       const {refreshToken,...others} = result
       // set Refresh Token in Cokkie
        const cookieOpions ={
           secure:config.env === 'production',
           httpOnly:true  
        } 
        res.cookie('refreshToken',refreshToken,cookieOpions);

       sendResponse<ILoginUserResponse>(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: 'User Logged In successfully!',
        data: others,
       })
  });


export const AuthController =  {
    loginUser
}  