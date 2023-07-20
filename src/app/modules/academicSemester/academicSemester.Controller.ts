import {NextFunction, Request,Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createSemester = catchAsync(
  async(req:Request,res:Response,next:NextFunction) =>{
    const {...academicSemesterData} = req.body;
     const result = await AcademicSemesterService.createSemester(academicSemesterData);
     sendResponse(res,{
      statusCode: status.OK,
      success:true,
      message: 'Academic semester created successfully!',
      data: result,
     })
     next();
  }); 
  

export const AcademicSemesterController = {createSemester}