import  express  from "express";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemesterRoute";
import { UserRoutes } from "../modules/users/user.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFacultyRoute";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartmentRoute";
const router = express.Router();

const moduleRoutes = [
    {
        path:"/academicSemesters",
        route:AcademicSemesterRoutes
    },
    {
        path:"/academicFaculity",
        route:AcademicFacultyRoutes
    },
    {
        path:"/academicDepartment",
        route:AcademicDepartmentRoutes
    },
    {
        path:"/users",
        route:UserRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path,route.route))

export default router;