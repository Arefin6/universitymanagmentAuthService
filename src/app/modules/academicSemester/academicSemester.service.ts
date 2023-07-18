import { IAcademicSemester } from "./academicSemester.interface";
import AcademicSemester from "./academicSemesterModel";

const createSemester = async(payload:IAcademicSemester):Promise<IAcademicSemester> =>{

   const result = await AcademicSemester.create(payload);
   
   return result;

}

export const AcademicSemesterService = { createSemester}