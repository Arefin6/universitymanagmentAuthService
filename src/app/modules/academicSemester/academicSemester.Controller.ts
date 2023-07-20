import {NextFunction, Request,Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { IAcademicSemester } from "./academicSemester.interface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";

const createSemester = catchAsync(
  async(req:Request,res:Response,next:NextFunction) =>{
    const {...academicSemesterData} = req.body;
     const result = await AcademicSemesterService.createSemester(academicSemesterData);
     sendResponse<IAcademicSemester>(res,{
      statusCode: status.OK,
      success:true,
      message: 'Academic semester created successfully!',
      data: result,
     })
     next();
});

// get All Semester

const getAllSemester = catchAsync(
  async(req:Request,res:Response,next:NextFunction) =>{
      
     const paginationOpions = pick(req.query,paginationFields);   

     const result = await AcademicSemesterService.getAllSemester(paginationOpions);
     sendResponse<IAcademicSemester[]>(res,{
      statusCode: status.OK,
      success:true,
      message: 'Academic semesters retrived successfully!',
      meta:result.meta,
      data: result.data,
     })
     next();
}); 
  

export const AcademicSemesterController = {createSemester,getAllSemester}