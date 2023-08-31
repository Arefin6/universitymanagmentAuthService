import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartmentValidation';
import { AcademicDepartmentController } from './academicDepartmentController';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router()

router.post('/create',
validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
AcademicDepartmentController.createDepartment);

router.get('/:id',AcademicDepartmentController.getSingleDepartment);

router.delete('/:id',
auth(ENUM_USER_ROLE.SUPER_ADMIN),
AcademicDepartmentController.deleteDepartment);

router.put('/:id',
validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
AcademicDepartmentController.updateDepartment);

router.get('/',AcademicDepartmentController.getAllDepartments);


export const AcademicDepartmentRoutes = router;