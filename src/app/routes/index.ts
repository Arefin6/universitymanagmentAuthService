import  express  from "express";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemesterRoute";
const router = express.Router();

const moduleRoutes = [
    {
        path:"/academicSemesters",
        route:AcademicSemesterRoutes
    },
    {
        path:"/users",
        route:AcademicSemesterRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path,route.route))

export default router;