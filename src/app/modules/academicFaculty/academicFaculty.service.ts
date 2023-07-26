import { SortOrder } from "mongoose";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationoption } from "../../../interfaces/pagination";
import { academicFacilitySearchableFields } from "./academicFaculty.constants";
import { IAcademicFacultFilters, IAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";
import { IGenericResponse } from "../../../interfaces/common";

const createFaculty = async (payload:IAcademicFaculty):Promise<IAcademicFaculty>=>{
  
   const result = await AcademicFaculty.create(payload);
   
   return result;
}


const getSingleFaculty = async (id:string):Promise<IAcademicFaculty|null>=>{
  
    const result = await AcademicFaculty.findById(id);
    
    return result;
 }

 
const updateFaculty = async (id:string,payload:IAcademicFaculty):Promise<IAcademicFaculty|null>=>{
    
    const result = await AcademicFaculty.findOneAndUpdate({_id:id},payload,{new:true});
    
    return result;
 }

 
const deleteFaculty = async (id:string):Promise<IAcademicFaculty|null>=>{
  
    const result = await AcademicFaculty.findByIdAndDelete(id);
    
    return result;
 }



const getAllFacities = async (filters:IAcademicFacultFilters,paginationOptions:IPaginationoption): Promise<IGenericResponse<IAcademicFaculty[]>>=>{
  const{searchTerm,...filtersData} = filters;
  const {page,limit,skip,sortBy,sortOrder}=paginationHelpers.calculatePagination(paginationOptions);

  const andConditions =[];

  // Search needs $or for searching in specified fields
  if(searchTerm){
    andConditions.push({
        $or:academicFacilitySearchableFields.map(field=>({
            [field]:{
                $regex: searchTerm,
                $options: "i"
            },
        }))
    })
  }

  // Filters needs $and to fullfill all the conditions

  if(Object.keys(filtersData).length){
    andConditions.push({
        $and: Object.entries(filtersData).map(([field,value])=>({
           [field]:value
        }))
    });
  }

   // Dynamic sort needs  fields to  do sorting

   const sortConditions:{[key:string]:SortOrder} ={}

    if(sortBy && sortOrder){
        sortConditions[sortBy]=sortOrder
    }

    const whereCondition = andConditions.length>0 ? {$and:andConditions}:{};


    const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

    const total = await AcademicFaculty.countDocuments(whereCondition)

    return{
     meta:{
        page,
        limit,
        total
     },
     data:result
    }

 }

export const AcademicFaculityService ={
    createFaculty,
    getAllFacities,
    getSingleFaculty,
    deleteFaculty,
    updateFaculty
}