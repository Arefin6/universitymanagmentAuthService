import  express  from "express";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemesterRoute";
import { UserRoutes } from "../modules/users/user.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFacultyRoute";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartmentRoute";
import { StudentRoutes } from "../modules/student/student.route";
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
    {
        path:"/students",
        route:StudentRoutes
    },
];

moduleRoutes.forEach(route => router.use(route.path,route.route))

export default router;