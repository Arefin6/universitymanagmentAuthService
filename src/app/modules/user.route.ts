import  express  from 'express';
import userController from './users/user.controller';
const router = express.Router();

router.post('/create-user',userController.createUser);

export default router;