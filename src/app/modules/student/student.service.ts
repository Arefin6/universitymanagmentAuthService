import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationoption } from "../../../interfaces/pagination";
import { IStudent, IStudentFilters } from "./student.interface";
import Student from "./student.model";
import { studentSearchableFields } from "./studentConstant";


// get Single Student
const  getSingleStudent = async(id:string):Promise<IStudent | null>=>{
   const result = await Student.findById(id);
   return result;
}

// // Update Semester
// const  updateSemester = async(id:string,payload:Partial<IAcademicSemester>):Promise<IAcademicSemester | null>=>{
//    if(payload.title && payload.code && academicSemesterTitleCodeMapper[payload.title]!== payload.code){
//       throw new ApiError(status.BAD_REQUEST, 'Invalid Semester Code');
//    }
//    const result = await AcademicSemester.findOneAndUpdate({_id:id},payload,{new:true});
//    return result;
// }

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

export const StudentService = { getAllStudent,getSingleStudent,deleteStudent}