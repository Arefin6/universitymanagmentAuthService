/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationoption } from "../../../interfaces/pagination";
import { IStudent, IStudentFilters } from "./student.interface";
import Student from "./student.model";
import { studentSearchableFields } from "./studentConstant";
import ApiError from "../../../erros/ApiError";
import httpStatus from "http-status";


// get Single Student
const  getSingleStudent = async(id:string):Promise<IStudent | null>=>{
   const result = await Student.findById(id);
   return result;
}

//  Update Student
const  updateStudent = async(id:string,payload:Partial<IStudent>):Promise<IStudent | null>=>{

   const isExists = await Student.findOne({id})
   
   if(!isExists){
      throw new ApiError(httpStatus.NOT_FOUND, 'Student Not Found');
   }
   const {name,guirdian,localGuardian,...studentData}= payload

   const updatedStudentData:Partial<IStudent> = {...studentData} ;

   if (name && Object.keys(name).length > 0) {
      Object.keys(name).forEach(key => {
        const nameKey = `name.${key}` as keyof Partial<IStudent>; // `name.fisrtName`
        (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
      });
    }
    if ( guirdian&& Object.keys(guirdian).length > 0) {
      Object.keys(guirdian).forEach(key => {
        const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // `guardian.fisrtguardian`
        (updatedStudentData as any)[guardianKey] =
        guirdian[key as keyof typeof guirdian];
      });
    }
    if (localGuardian && Object.keys(localGuardian).length > 0) {
      Object.keys(localGuardian).forEach(key => {
        const localGuradianKey =
          `localGuardian.${key}` as keyof Partial<IStudent>; // `localGuardian.fisrtName`
        (updatedStudentData as any)[localGuradianKey] =
          localGuardian[key as keyof typeof localGuardian];
      });
    }
   const result = await Student.findOneAndUpdate({id},payload,{new:true});
   return result;
}

// delete Student
const  deleteStudent = async(id:string):Promise<IStudent | null>=>{
   const result = await Student.findByIdAndDelete(id)
   return result;
}


const getAllStudent = async(filters: IStudentFilters,paginationOptions:IPaginationoption):Promise<IGenericResponse<IStudent[]>>=>{

   const {page,limit,skip,sortBy,sortOrder} = paginationHelpers.calculatePagination(paginationOptions); 

   const {searchTerm,...filterData} = filters;
 
   const andConditions = [];
  
   // Search needs $or for searching in specified fields

   if(searchTerm){
      andConditions.push({
        $or:studentSearchableFields.map((field)=>({
         [field]:{
           $regex:searchTerm,
           $options:'i'
         }
        })) 
      })
   }


   if (Object.keys(filterData).length) {
      andConditions.push({
        $and: Object.entries(filterData).map(([field, value]) => ({
          [field]: value,
        })),
      });
   }

   const  whereCondition = andConditions.length >0 ?{$and:andConditions}:{};

   
   const sortConditions:{ [key:string]:SortOrder} = {}

   if(sortBy && sortOrder){
      sortConditions[sortBy]= sortOrder
   }

   const result = await Student.find(whereCondition).sort(sortConditions).skip(skip).limit(limit);

   const total = await Student.countDocuments();

   return {
     meta:{
      page,
      limit,
      total
     },
     data:result
   }
}

export const StudentService = { getAllStudent,getSingleStudent,deleteStudent,updateStudent}