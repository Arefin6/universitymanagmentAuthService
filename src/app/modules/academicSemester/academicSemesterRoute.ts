import  express  from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemesterValidation';
import { AcademicSemesterController } from './academicSemester.Controller';

const router = express.Router();

router.post('/create-semester',
validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),AcademicSemesterController.createSemester);
router.get('/',AcademicSemesterController.getAllSemester);
 
export const AcademicSemesterRoutes =  router;