import  express  from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/create-student',
validateRequest(UserValidation.createStudentZodSchema),
auth(ENUM_USER_ROLE.ADMIN,ENUM_USER_ROLE.SUPER_ADMIN),
UserController.createStudent);
 
export const UserRoutes =  router;