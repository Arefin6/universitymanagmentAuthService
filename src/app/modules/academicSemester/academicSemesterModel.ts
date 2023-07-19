import { Schema,model } from "mongoose";
import { AcademicSemesterModel, IAcademicSemester } from "./academicSemester.interface";
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from "./academicSemesterConstants";
import ApiError from "../../../erros/ApiError";
import status from 'http-status';

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

  academicSemesterSchema.pre('save',async function(next){
    const isExists = await AcademicSemester.findOne({title:this.title,year:this.year});
    if(isExists){
      throw new ApiError(status.CONFLICT,"Academic Semester Already Exists!")
    }
    next()
  })
  const AcademicSemester = model<IAcademicSemester,AcademicSemesterModel>("AcademicSemester",academicSemesterSchema);

  export default AcademicSemester;