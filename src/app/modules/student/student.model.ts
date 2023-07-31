import { Schema,model } from "mongoose";
import { bloodGroup, gender } from "./studentConstant";
import { IStudent, StudentModel } from "./student.interface";


 const studentSchema = new Schema<IStudent>({
   id:{
    type:String,
    required:true,
    unique:true
   },
   name:{
    type:{
        firstName:{
            type:String,
            required:true
        },
        middleName:{
          type:String
        },
        lastName:{
            type:String,
            required:true
        }
    },
    required:true
   },
   gender:{
    type:String,
    enum:gender,
    required:true
   },
   dateOfBirth:{
      type:String,
   },
   email:{
    type:String,
    required:true,
    unique:true
   },
   contactNo:{
    type:String,
    required:true
   },
   emergencyContactNo:{
     type:String,
     required:true
   },
   bloodGroup:{
    type:String,
    enum:bloodGroup
   },
   presentAddress:{
    type:String,
    required: true,
   },
   permanentAddress: {
    type: String,
    required: true
  },
  guirdian: {
    required: true,
    type: {
      fatherName: {
        type: String,
        required: true,
      },
      fatherOccupation: {
        type: String,
        required: true,
      },
      fatherContactNo: {
        type: String,
        required: true,
      },
      motherName: {
        type: String,
        required: true,
      },
      motherOccupation: {
        type: String,
        required: true,
      },
      motherContactNo: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },
    localGuardian: {
        required: true,
        type: {
          name: {
            type: String,
            required: true,
          },
          occupation: {
            type: String,
            required: true,
          },
          contactNo: {
            type: String,
            required: true,
          },
          address: {
            type: String,
            required: true,
          },
        },
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true,
      },
      academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true,
      },
      academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true,
      },
      profileImage: {
        type: String,
      },
  },
  },{timestamps:true,
     toJSON:{
      virtuals:true
     } 
   });

  const Student = model<IStudent,StudentModel>("Student",studentSchema)

  export default Student;