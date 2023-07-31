import {  Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interface";
import { IAcademicDepartment } from "../academicDepartment/academicDepartmentInterface";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";

export type UserName={
    firstName:string,
    middleName:string,
    lastName:string
}

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
};

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};
export type IStudent ={
   id:string,
   name:UserName,
   gender:'male'|'female',
   dateOfBirth?:string,
   email:string,
   contactNo:string,
   emergencyContactNo: string;
   bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
   presentAddress:string,
   permanentAddress:string,
   guirdian:Guardian,
   localGuardian:LocalGuardian,
   academicFaculty: Types.ObjectId | IAcademicFaculty; // reference _id
   academicDepartment: Types.ObjectId | IAcademicDepartment; // reference _id
   academicSemester: Types.ObjectId | IAcademicSemester; // reference _id
   profileImage?: string;
} 

export type StudentModel = Model<IStudent,Record<string,unknown>>