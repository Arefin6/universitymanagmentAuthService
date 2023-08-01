import  express  from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post('/create-student',
validateRequest(UserValidation.createStudentZodSchema),UserController.createStudent);
 
export const UserRoutes =  router;