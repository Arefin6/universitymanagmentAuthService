import { SortOrder } from "mongoose";
import ApiError from "../../../erros/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationoption } from "../../../interfaces/pagination";
import { IAcademicSemester, IAcademicSemesterFilters } from "./academicSemester.interface";
import { academicSemesterSerachableFields, academicSemesterTitleCodeMapper } from "./academicSemesterConstants";
import AcademicSemester from "./academicSemesterModel";
import status from 'http-status';

const createSemester = async(payload:IAcademicSemester):Promise<IAcademicSemester> =>{

   if(academicSemesterTitleCodeMapper[payload.title]!== payload.code){
      throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
   }

   const result = await AcademicSemester.create(payload);
   
   return result;

}

// get Single Semester
const  getSingleSemester = async(id:string):Promise<IAcademicSemester | null>=>{
   const result = await AcademicSemester.findById(id);
   return result;
}

// Update Semester
const  updateSemester = async(id:string,payload:Partial<IAcademicSemester>):Promise<IAcademicSemester | null>=>{
   if(payload.title && payload.code && academicSemesterTitleCodeMapper[payload.title]!== payload.code){
      throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
   }
   const result = await AcademicSemester.findOneAndUpdate({_id:id},payload,{new:true});
   return result;
}

// delete Semester
const  deleteSemester = async(id:string):Promise<IAcademicSemester | null>=>{
   const result = await AcademicSemester.findByIdAndDelete(id)
   return result;
}


const getAllSemester = async(filters: IAcademicSemesterFilters,paginationOptions:IPaginationoption):Promise<IGenericResponse<IAcademicSemester[]>>=>{

   const {page,limit,skip,sortBy,sortOrder} = paginationHelpers.calculatePagination(paginationOptions); 

   const {searchTerm,...filterData} = filters;
 
   const andConditions = [];
  
   // Search needs $or for searching in specified fields

   if(searchTerm){
      andConditions.push({
        $or:academicSemesterSerachableFields.map((field)=>({
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

   const result = await AcademicSemester.find(whereCondition).sort(sortConditions).skip(skip).limit(limit);

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

export const AcademicSemesterService = { createSemester,getAllSemester,getSingleSemester,updateSemester,deleteSemester}