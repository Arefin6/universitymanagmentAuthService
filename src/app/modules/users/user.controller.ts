import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createStudent = catchAsync(
  async(req:Request,res:Response) =>{
    const {student,...userData} = req.body;
    const result = await UserService.createUser(student,userData);
    sendResponse(res,{
      statusCode: status.OK,
      success:true,
      message: 'User created successfully!',
      data: result,
     })
}) 


export const UserController = {createStudent}