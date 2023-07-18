import { z } from "zod";
import { academicSemesterCodes, academicSemesterMonths, academicSemesterTitles } from "./academicSemesterConstants";

const createAcademicSemesterZodSchema = z.object({
    body:z.object({
      title:z.enum([...academicSemesterTitles]as[string,...string[]],{
        required_error: 'Title is required',
      }),
      year:z.string({
        required_error: 'Year is required',
      }),
      code:z.enum([...academicSemesterCodes]as[string,...string[]],{
        required_error: 'Code is required',
      }),
      startMonth:z.enum([...academicSemesterMonths]as[string,...string[]],{
        required_error: 'StartMonth is required',
      }),
      endMonth:z.enum([...academicSemesterMonths]as[string,...string[]],{
        required_error: 'EndMonth is required',
      }),
    })
})

export const AcademicSemesterValidation = {
    createAcademicSemesterZodSchema
};