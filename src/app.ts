import express, { Application} from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/golbalErrorHandler";
import { UserRoutes } from "./app/modules/users/user.route";
const app:Application = express();

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app routes
app.use('/api/v1/users/',UserRoutes)

// GET method route
//Test Route
app.get('/',async function (req, res,next) {
    Promise.reject(new Error("Unhandled Promise Rejection"))
});

// global Error Handler

app.use(globalErrorHandler)
  
export default app;