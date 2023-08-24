import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import httpStatus from "http-status";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";

const loginUser = catchAsync(
    async(req:Request,res:Response) =>{
      const {...loginData} = req.body;
       const result = await AuthService.loginUser(loginData);
       sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: 'User Logged In successfully!',
        data: result,
       })
  });


export const AuthController =  {
    loginUser
}  