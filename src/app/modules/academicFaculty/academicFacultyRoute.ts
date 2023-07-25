import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFaculityValidation } from './academicFaculty.validation';
import { AcademicFaculityController } from './academicFaculty.controller';

const router = express.Router()

router.post('/create',validateRequest(AcademicFaculityValidation.createFacultyZodSchema),AcademicFaculityController.createFaculty);


export const AcademicFacultyRoutes = router;