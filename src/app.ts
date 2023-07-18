import express, { Application} from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/golbalErrorHandler";
import { UserRoutes } from "./app/modules/users/user.route";
import { AcademicSemesterRoutes } from "./app/modules/academicSemester/academicSemesterRoute";
const app:Application = express();

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app routes
app.use('/api/v1/users/',UserRoutes)
app.use('/api/v1/academicSemester/',AcademicSemesterRoutes)

// GET method route
//Test Route
app.get('/',async function (req,res) {
    res.send("Api running");
    // Promise.reject(new Error("Unhandled Promise Rejection"))
});

// global Error Handler

app.use(globalErrorHandler)
  
export default app;