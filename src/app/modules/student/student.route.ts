import  express  from 'express';
import { StudentController } from './student.Controller';
import { StudentValidaion } from './studentValidation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();


router.get('/:id',StudentController.getSingleStudent)
router.patch(':/id', validateRequest(StudentValidaion.updateStudentZodSchema),StudentController.updateStudent)
router.delete('/:id',StudentController.deleteStudent)
router.get('/',StudentController.getAllStudent)


 
export const StudentRoutes =  router;