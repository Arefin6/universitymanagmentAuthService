import { SortOrder } from "mongoose"

export type IPaginationoption={
  page?:number,
  limit?:number,
  sortBy?:string,
  sortOrder?:SortOrder
}