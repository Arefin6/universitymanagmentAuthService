import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse";
import { IAcademicFaculty } from "./academicFaculty.interface";

const createFaculty = catchAsync(async(req,res)=>{
//   const {...academicFacultyData} = req.body;
//   const result ={};
  sendResponse<IAcademicFaculty>(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully',
    // data: result,
  })

})

export const AcademicFaculityController ={
    createFaculty
}