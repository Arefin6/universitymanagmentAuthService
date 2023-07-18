import { Schema,model } from "mongoose";
import { AcademicSemesterModel, IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from "./academicSemesterConstants";

const academicSemesterSchema = new Schema<IAcademicSemester>({
   title:{
    type:String,
    required:true,
    enum:academicSemesterTitles,
   },
   year:{
    type:String,
    required:true
   },
   code:{
    type:String,
    required:true,
    enum:academicSemesterCodes
   },
   startMonth:{
    type:String,
    required:true,
    enum:academicSemesterMonths
   },
   endMonth:{
    type:String,
    required:true,
    enum:academicSemesterMonths
   },
  },{timestamps:true});

  const AcademicSemester = model<IAcademicSemester,AcademicSemesterModel>("AcademicSemester",academicSemesterSchema)
  export default AcademicSemester;