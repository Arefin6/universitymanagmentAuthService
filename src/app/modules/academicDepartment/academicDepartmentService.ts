import { SortOrder } from "mongoose";
import { IAcademicDepartment, IAcademicDepartmentFilters } from "./academicDepartmentInterface";
import { AcademicDepartment } from "./academicDepartmentModel";
import { academicDepartmentSearchableFields } from "./academicDepartmentConstant";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IPaginationoption } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";

const createDepartment = async (payload:IAcademicDepartment):Promise<IAcademicDepartment>=>{
  
    const result = (await AcademicDepartment.create(payload)).populate(
        'academicFaculty'
    );
    
    return result;
}
 
const getAllDepartments = async (filters:IAcademicDepartmentFilters,paginationOptions:IPaginationoption): Promise<IGenericResponse<IAcademicDepartment[]>>=>{
    const{searchTerm,...filtersData} = filters;
    const {page,limit,skip,sortBy,sortOrder}=paginationHelpers.calculatePagination(paginationOptions);
  
    const andConditions =[];
  
    // Search needs $or for searching in specified fields
    if(searchTerm){
      andConditions.push({
          $or:academicDepartmentSearchableFields.map(field=>({
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
  
  
      const result = await AcademicDepartment.find(whereCondition)
      .populate('academicFaculty')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)
  
      const total = await  AcademicDepartment.countDocuments(whereCondition)
  
      return{
       meta:{
          page,
          limit,
          total
       },
       data:result
      }
  
   }

const getSingleDepartment = async (id:string):Promise<IAcademicDepartment|null>=>{
  
    const result = await AcademicDepartment.findById(id).populate('academicFaculty');
    
    return result;
 }

 
const updateDepartment = async (id:string,payload:IAcademicDepartment):Promise<IAcademicDepartment|null>=>{
    
    const result = await AcademicDepartment.findOneAndUpdate({_id:id},payload,{new:true});
    
    return result;
 }

 
const deleteDepartment = async (id:string):Promise<IAcademicDepartment|null>=>{
  
    const result = await AcademicDepartment.findByIdAndDelete(id);
    
    return result;
 }

export const AcademicDepartmentSevice ={
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment
}