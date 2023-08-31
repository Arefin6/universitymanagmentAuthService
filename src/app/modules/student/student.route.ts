import  express  from 'express';
import { StudentController } from './student.Controller';
import { StudentValidaion } from './studentValidation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();


router.get('/:id',
auth(ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT),
StudentController.getSingleStudent)

router.patch(':/id', 
validateRequest(StudentValidaion.updateStudentZodSchema),
auth(ENUM_USER_ROLE.SUPER_ADMIN,ENUM_USER_ROLE.ADMIN),
StudentController.updateStudent)

router.delete('/:id',
auth(ENUM_USER_ROLE.SUPER_ADMIN),
StudentController.deleteStudent)

router.get('/',
auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
StudentController.getAllStudent)


 
export const StudentRoutes =  router;