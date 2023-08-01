import config from "../../../config";
import User from "./user.model"
import { IUser } from "./user.interface"
//import { generateStudentId } from "./user.utils";
import ApiError from "../../../erros/ApiError";
import { IStudent } from "../student/student.interface";
import AcademicSemester from "../academicSemester/academicSemesterModel";
import { generateStudentId } from "./user.utils";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import mongoose from "mongoose";
import Student from "../student/student.model";
import httpStatus from "http-status";

const createUser = async (student:IStudent,user:IUser)=>{
   
  //default password
  if(!user.password){
    user.password = config.StudentDefaultPassword as string;
  } 
  
  // set Role
   user.role ='student';

   const academicSemester = await AcademicSemester.findById(student.academicSemester).lean();
   
   const session = await mongoose.startSession();

   let newUserAllData = null;

   try {
    session.startTransaction()
    const id = await generateStudentId(academicSemester as IAcademicSemester);
     // set custom id into both  student & user
    user.id = id;
    student.id = id;

    //create Student Using Session

    const newStudent = await Student.create([student],{session})

    if(!newStudent.length){
      throw new ApiError(httpStatus.BAD_REQUEST,"Failed To Create Student");
    }
     // set student _id (reference) into user.student
     user.student = newStudent[0]._id;
      
    //create User 
    
    const newUser = await User.create([user],{session});

    if(!newUser.length){
       throw new ApiError(httpStatus.BAD_REQUEST,"Failed TO Create User");       
    }

    newUserAllData = newUser[0];
     
    await session.commitTransaction()
    await session.endSession()
   } catch (error) {
     await session.abortTransaction()
     await session.endSession()
     throw error;
   }
   
   if(newUserAllData){
     newUserAllData = await User.find({id:newUserAllData.id}).populate({
      path:'student',
      populate:[
        {
          path:"academicFaculty"
        },
        {
          path:"academicSemester"
        },
        {
          path:"academicDepartment"
        }
      ],
     })
   }
  
  return newUserAllData;
}

export const UserService={
  createUser
}