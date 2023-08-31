import  express  from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemesterValidation';
import { AcademicSemesterController } from './academicSemester.Controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/create-semester',
validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
AcademicSemesterController.createSemester);

router.get('/:id',
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.STUDENT),
AcademicSemesterController.getSingleSemester);

router.put('/:id',
validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
AcademicSemesterController.updateSemester);

router.delete('/:id',
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
AcademicSemesterController.deleteSemester);

router.get('/',
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.FACULTY,ENUM_USER_ROLE.STUDENT,ENUM_USER_ROLE.ADMIN),
AcademicSemesterController.getAllSemester);
 
export const AcademicSemesterRoutes =  router;