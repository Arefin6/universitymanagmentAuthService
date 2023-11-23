/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema,model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../../config";

const UserSchema = new Schema<IUser>({
   id:{
    type:String,
    required:true,
    unique:true
   },
   role:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true,
    select:0
   },
   needsPasswordChange:{
    type:Boolean,
    default:true
   },
   passwordChangedAt:{
    type:Date,
   },
   student:{
      type:Schema.Types.ObjectId,
      ref:'Student'
   },
   // faculty:{
   //    type:Schema.Types.ObjectId,
   //    ref:'Faculty'
   // },
   // admin:{
   //    type:Schema.Types.ObjectId,
   //    ref:'Admin'
   // },
  },{timestamps:true,
     toJSON:{
      virtuals:true
     } 
   });

 
 // check if User Exists
 
 UserSchema.statics.isUserExits = async function(id:string):Promise<IUser | null>{
       return await User.findOne({id},{id:1,password:1,needsPasswordChange:1});                       
 };

 // compare Password
 
 UserSchema.statics.isPasswordMatched = async function(givenPassword:string,savedPassword:string):Promise<boolean>{
  return await bcrypt.compare(givenPassword,savedPassword)                       
};

 // hash Password Before Saving
 
 UserSchema.pre('save',async function(next){
    
   const user = this;

   user.password = await bcrypt.hash(user.password,Number(config.bcryptSaltRound))
    
   next();
    
 });

  const User = model<IUser,UserModel>("User",UserSchema)
  export default User;