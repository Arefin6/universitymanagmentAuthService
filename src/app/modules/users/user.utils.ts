/* eslint-disable no-undefined */
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";
import User from "./user.model"

const findLastStudentId = async():Promise<string | undefined>=>{
    const lastStudent = await User.findOne({role:'student'},{id:1,_id:0}).sort({createdAt:-1}).lean();

    return lastStudent?.id ? lastStudent?.id.substring(4):undefined ;
}

const findLastFacultyId = async():Promise<string | undefined>=>{
    const lastFaculty = await User.findOne({role:'faculty'},{id:1,_id:0}).sort({createdAt:-1}).lean();

    return lastFaculty?.id ? lastFaculty?.id.substring(2):undefined ;
}


const findLastAdminId = async():Promise<string | undefined>=>{
    const lastAdmin = await User.findOne({role:'admin'},{id:1,_id:0}).sort({createdAt:-1}).lean();

    return lastAdmin?.id ? lastAdmin?.id.substring(2):undefined ;
}

export const generateAdminId = async() =>{
    const currentId = (await findLastAdminId())||(0).toString().padStart(5,"0");
 
    // increment id
    let incrementedId = (parseInt(currentId)+1).toString().padStart(5,"0");
     
    incrementedId = `A-${incrementedId}`
 
    return incrementedId;
 }


export const generateFacultyId = async() =>{
    const currentId = (await findLastFacultyId())||(0).toString().padStart(5,"0");
 
    // increment id
    let incrementedId = (parseInt(currentId)+1).toString().padStart(5,"0");
     
    incrementedId = `F-${incrementedId}`
 
    return incrementedId;
 }

export const generateStudentId = async(academicSemester:IAcademicSemester) =>{
   const currentId = (await findLastStudentId())||(0).toString().padStart(5,"0");

   // increment id
   let incrementedId = (parseInt(currentId)+1).toString().padStart(5,"0");
    
   incrementedId = `${academicSemester.year.substring(2)}${academicSemester.code}${incrementedId}`

   return incrementedId;
}