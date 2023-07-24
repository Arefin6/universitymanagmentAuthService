import { z } from "zod";

const createFacultyZodSchema = z.object({
    body:z.object({
        title:z.string({
            required_error: 'Title is required', 
        })
    })
});


export const AcademicFaculityValidation ={
    createFacultyZodSchema
}