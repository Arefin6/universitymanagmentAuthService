import {Request,Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { IStudent } from "./student.interface";
import { studentFilterableFields } from "./studentConstant";
import { StudentService } from "./student.service";




// get Single Student

const getSingleStudent = catchAsync(async(req:Request,res:Response) =>{
   
  const id = req.params.id;
  
  const result =  await StudentService.getSingleStudent(id);

  sendResponse<IStudent>(res,{
    statusCode: status.OK,
    success:true,
    message: 'Student fetched successfully!',
    data: result,
   }) 
})


// get All Student

const getAllStudent = catchAsync(
  async(req:Request,res:Response) =>{
      
     const paginationOptions = pick(req.query,paginationFields);
     
     const filters = pick(req.query,studentFilterableFields);

     const result = await StudentService.getAllStudent(filters,paginationOptions,);
     sendResponse<IStudent[]>(res,{
      statusCode: status.OK,
      success:true,
      message: 'Student Fetched successfully!',
      meta:result.meta,
      data: result.data,
     })
}); 

// // Update Student

// const updateStudent = catchAsync(
//   async(req:Request,res:Response) =>{
//       const id = req.params.id;
//       const updatedData = req.body
   
//      const result = await AcademicSemesterService.updateSemester(id,updatedData);
//      sendResponse<IStudent>(res,{
//       statusCode: status.OK,
//       success:true,
//       message: 'Student Updated successfully!',
//       data: result
//      })
// });

// delete Student

const deleteStudent = catchAsync(
  async(req:Request,res:Response) =>{
      const id = req.params.id;
     const result = await  StudentService.deleteStudent(id);
     sendResponse<IStudent>(res,{
      statusCode: status.OK,
      success:true,
      message: 'Student deleted successfully!',
      data: result
     })
});
  
export const StudentController = {getAllStudent,getSingleStudent,deleteStudent}