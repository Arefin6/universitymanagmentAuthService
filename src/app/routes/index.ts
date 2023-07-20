import  express  from "express";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemesterRoute";
import { UserRoutes } from "../modules/users/user.route";
const router = express.Router();

const moduleRoutes = [
    {
        path:"/academicSemesters",
        route:AcademicSemesterRoutes
    },
    {
        path:"/users",
        route:UserRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path,route.route))

export default router;