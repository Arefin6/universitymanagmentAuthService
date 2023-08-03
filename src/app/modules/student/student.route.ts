import  express  from 'express';
import { StudentController } from './student.Controller';
const router = express.Router();


router.get('/:id',StudentController.getSingleStudent)
router.delete('/:id',StudentController.deleteStudent)
router.get('/',StudentController.getAllStudent)


 
export const StudentRoutes =  router;