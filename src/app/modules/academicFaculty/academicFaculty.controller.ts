import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculityService } from "./academicFaculty.service";
import pick from "../../../shared/pick";
import { academicFacilityFilltarableFields } from "./academicFaculty.constants";
import { paginationFields } from "../../../constants/pagination";

const createFaculty = catchAsync(async(req,res)=>{
   const {...academicFacultyData} = req.body;
   const result = await AcademicFaculityService.createFaculty(academicFacultyData);
  sendResponse<IAcademicFaculty>(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  })

})

const getAllFacities = catchAsync(async(req,res)=>{

  const filters = pick(req.query,academicFacilityFilltarableFields);
  const paginationOptions = pick(req.query,paginationFields);
  
  const result = await AcademicFaculityService.getAllFacities(filters,paginationOptions);
 sendResponse<IAcademicFaculty[]>(res,{
   statusCode: httpStatus.OK,
   success: true,
   message: 'Academic faculty fecthed successfully',
   meta:result.meta,
   data: result.data,
 })

})


const updateFaculty = catchAsync(async(req,res)=>{
  
  const result = await AcademicFaculityService.updateFaculty(req.params.id,req.body);

 sendResponse<IAcademicFaculty>(res,{
   statusCode: httpStatus.OK,
   success: true,
   message: 'Academic faculty updated successfully',
   data: result,
 })

})



const getSingleFaculty = catchAsync(async(req,res)=>{

  const result = await AcademicFaculityService.getSingleFaculty(req.params.id);
 sendResponse<IAcademicFaculty>(res,{
   statusCode: httpStatus.OK,
   success: true,
   message: 'Academic faculty fecthed successfully',
   data: result,
 })

})



const deleteFaculty = catchAsync(async(req,res)=>{

  const result = await AcademicFaculityService.deleteFaculty(req.params.id);
  sendResponse<IAcademicFaculty>(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  })

})

export const AcademicFaculityController ={
    createFaculty,
    getAllFacities,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty
}