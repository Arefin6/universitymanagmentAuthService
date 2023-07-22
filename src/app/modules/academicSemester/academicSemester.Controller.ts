import {NextFunction, Request,Response } from "express";
import { AcademicSemesterService } from "./academicSemester.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { IAcademicSemester } from "./academicSemester.interface";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { academicSemesterFillerableFields } from "./academicSemesterConstants";

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


// get Single Semester

const getSingleSemester = catchAsync(async(req:Request,res:Response) =>{
   
  const id = req.params.id;
  
  const result =  await AcademicSemesterService.getSingleSemester(id);

  sendResponse<IAcademicSemester>(res,{
    statusCode: status.OK,
    success:true,
    message: 'Academic Semester fetched successfully!',
    data: result,
   }) 
})


// get All Semester

const getAllSemester = catchAsync(
  async(req:Request,res:Response,next:NextFunction) =>{
      
     const paginationOptions = pick(req.query,paginationFields);
     
     const filters = pick(req.query,academicSemesterFillerableFields);

     const result = await AcademicSemesterService.getAllSemester(filters,paginationOptions,);
     sendResponse<IAcademicSemester[]>(res,{
      statusCode: status.OK,
      success:true,
      message: 'Academic semesters retried successfully!',
      meta:result.meta,
      data: result.data,
     })
     next();
}); 

// Update Semester

const updateSemester = catchAsync(
  async(req:Request,res:Response,next:NextFunction) =>{
      const id = req.params.id;
      const updatedData = req.body
   
     const result = await AcademicSemesterService.updateSemester(id,updatedData);
     sendResponse<IAcademicSemester>(res,{
      statusCode: status.OK,
      success:true,
      message: 'Academic Semester Updated successfully!',
      data: result
     })
     next();
}); 
  
export const AcademicSemesterController = {createSemester,getAllSemester,getSingleSemester,updateSemester}