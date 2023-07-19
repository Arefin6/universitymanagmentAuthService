import ApiError from "../../../erros/ApiError";
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

export const AcademicSemesterService = { createSemester}