import express, { Application} from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/golbalErrorHandler";
import router from "./app/routes";
import status from 'http-status';

const app:Application = express();

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app routes
app.use('/api/v1',router)

// GET method route
//Test Route
app.get('/',async function (req,res) {
    res.send("Api running");
    // Promise.reject(new Error("Unhandled Promise Rejection"))
});

// global Error Handler

app.use(globalErrorHandler)

//handle Not Found

app.use((req,res,next)=>{
    res.status(status.NOT_FOUND).json({
        success:false,
        message:"Route Not Found",
        errorMessages:[
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
  
export default app;