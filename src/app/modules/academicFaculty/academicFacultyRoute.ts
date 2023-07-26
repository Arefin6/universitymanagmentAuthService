import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFaculityValidation } from './academicFaculty.validation';
import { AcademicFaculityController } from './academicFaculty.controller';

const router = express.Router()

router.post('/create',validateRequest(AcademicFaculityValidation.createFacultyZodSchema),AcademicFaculityController.createFaculty);
router.get('/:id',AcademicFaculityController.getSingleFaculty);
router.delete('/:id',AcademicFaculityController.deleteFaculty);
router.put('/:id',validateRequest(AcademicFaculityValidation.createFacultyZodSchema),AcademicFaculityController.updateFaculty);
router.get('/',AcademicFaculityController.getAllFacities);


export const AcademicFacultyRoutes = router;