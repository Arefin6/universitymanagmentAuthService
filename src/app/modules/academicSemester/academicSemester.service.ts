import { SortOrder } from "mongoose";
import ApiError from "../../../erros/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationoption } from "../../../interfaces/pagination";
import { IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterTitleCodeMapper } from "./academicSemesterConstants";
import AcademicSemester from "./academicSemesterModel";
import status from 'http-status';

const createSemester = async(payload:IAcademicSemester):Promise<IAcademicSemester> =>{

   if(academicSemesterTitleCodeMapper[payload.title]!== payload.code){
      throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
   }

   const result = await AcademicSemester.create(payload);
   
   return result;

}


const getAllSemester = async(paginationOptions:IPaginationoption):Promise<IGenericResponse<IAcademicSemester[]>>=>{

   const {page,limit,skip,sortBy,sortOrder} = paginationHelpers.calculatePagination(paginationOptions); 
   
   const sortConditions:{ [key:string]:SortOrder} = {}

   if(sortBy && sortOrder){
      sortConditions[sortBy]= sortOrder
   }

   const result = await AcademicSemester.find().sort(sortConditions).skip(skip).limit(limit);

   const total = await AcademicSemester.countDocuments();

   return {
     meta:{
      page,
      limit,
      total
     },
     data:result
   }



}

export const AcademicSemesterService = { createSemester,getAllSemester}