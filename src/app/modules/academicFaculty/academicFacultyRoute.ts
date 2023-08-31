import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFaculityValidation } from './academicFaculty.validation';
import { AcademicFaculityController } from './academicFaculty.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router()

router.post('/create',
validateRequest(AcademicFaculityValidation.createFacultyZodSchema),
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
AcademicFaculityController.createFaculty);

router.get('/:id',
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.ADMIN),
AcademicFaculityController.getSingleFaculty);

router.delete('/:id',
auth(ENUM_USER_ROLE.SUPER_ADMIN),
AcademicFaculityController.deleteFaculty);

router.put('/:id',
validateRequest(AcademicFaculityValidation.createFacultyZodSchema),
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.ADMIN),
AcademicFaculityController.updateFaculty);

router.get('/',
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.ADMIN),
AcademicFaculityController.getAllFacities);

export const AcademicFacultyRoutes = router;