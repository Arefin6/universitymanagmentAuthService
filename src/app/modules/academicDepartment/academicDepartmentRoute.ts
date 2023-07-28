import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartmentValidation';
import { AcademicDepartmentController } from './academicDepartmentController';


const router = express.Router()

router.post('/create',validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),AcademicDepartmentController.createDepartment);
router.get('/:id',AcademicDepartmentController.getSingleDepartment);
router.delete('/:id',AcademicDepartmentController.deleteDepartment);
router.put('/:id',validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),AcademicDepartmentController.updateDepartment);
router.get('/',AcademicDepartmentController.getAllDepartments);


export const AcademicDepartmentRoutes = router;