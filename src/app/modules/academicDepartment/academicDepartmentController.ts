import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAcademicDepartment } from "./academicDepartmentInterface";
import { AcademicDepartmentSevice } from "./academicDepartmentService";
import pick from "../../../shared/pick";
import { academicDepartmentFilltarableFields } from "./academicDepartmentConstant";
import { paginationFields } from "../../../constants/pagination";


const createDepartment = catchAsync(async(req,res)=>{
   const {...academicDepartmentData} = req.body;
   const result = await AcademicDepartmentSevice.createDepartment(academicDepartmentData);
  sendResponse<IAcademicDepartment>(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  })

})

const getAllDepartments = catchAsync(async(req,res)=>{

  const filters = pick(req.query,academicDepartmentFilltarableFields);
  const paginationOptions = pick(req.query,paginationFields);
  
  const result = await AcademicDepartmentSevice.getAllDepartments(filters,paginationOptions);
 sendResponse<IAcademicDepartment[]>(res,{
   statusCode: httpStatus.OK,
   success: true,
   message: 'Academic faculty fecthed successfully',
   meta:result.meta,
   data: result.data,
 })

})


const updateDepartment = catchAsync(async(req,res)=>{
  
  const result = await AcademicDepartmentSevice.updateDepartment(req.params.id,req.body);

 sendResponse<IAcademicDepartment>(res,{
   statusCode: httpStatus.OK,
   success: true,
   message: 'Academic faculty updated successfully',
   data: result,
 })

})



const getSingleDepartment = catchAsync(async(req,res)=>{

  const result = await  AcademicDepartmentSevice.getSingleDepartment(req.params.id);
 sendResponse<IAcademicDepartment>(res,{
   statusCode: httpStatus.OK,
   success: true,
   message: 'Academic faculty fecthed successfully',
   data: result,
 })

})



const deleteDepartment = catchAsync(async(req,res)=>{

  const result = await AcademicDepartmentSevice.deleteDepartment(req.params.id);
  sendResponse<IAcademicDepartment>(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
    data: result,
  })

})

export const AcademicDepartmentController ={
    createDepartment,
    getAllDepartments,
    getSingleDepartment,
    updateDepartment,
    deleteDepartment
}