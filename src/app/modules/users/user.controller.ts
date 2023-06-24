import {Request, Response } from "express";
import userService from "./user.service";

const createUser = async(req:Request,res:Response) =>{
   const user = req.body;
   try {
    const result = await userService.saveUser(user)
    res.status(200).json({
        success:true,
        msg:`user stored Successfully`,
        data:result
    })
   } catch (error) {
    res.status(500).json({
        success:false,
        msg:`failed store user ${error}`,
        data:{}
    })
   }
}

export default {createUser}