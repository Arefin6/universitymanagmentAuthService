/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undefined */
import  config  from "../../config";
import { ErrorRequestHandler } from "express";
import { IGenericErrorMessage } from "../../interfaces/error";
import handleValidationError from "../../erros/handleValidationError";
import ApiError from "../../erros/ApiError";
import { errorLogger } from "../../shared/logger";
import { ZodError } from "zod";
import handleZodError from "../../erros/handleZodError";
import handleCastError from "../../erros/handleCastError";

const globalErrorHandler:ErrorRequestHandler = (err,req,res,next)=>{
  
  config.env === "development"?
  console.log("Global error Handler",err):
  errorLogger.error("Global error Handler",err)


  let statusCode = 500;
  let message = "Something went wrong"
  let errorMessages:IGenericErrorMessage[]=[] 

  if(err?.name === 'ValidationError'){
     const simplifiedResponse = handleValidationError(err)
     statusCode = simplifiedResponse.statusCode;
     message = simplifiedResponse.message;
     errorMessages = simplifiedResponse.errorMessage
  }
  else if(err instanceof ZodError){
    const simplifiedError= handleZodError(err)
     statusCode = simplifiedError.statusCode;
     message = simplifiedError.message;
     errorMessages = simplifiedError.errorMessage;
  }
  else if(err?.name === 'CastError'){
    const simplifiedError = handleCastError(err)
     statusCode = simplifiedError.statusCode;
     message = simplifiedError.message;
     errorMessages = simplifiedError.errorMessages;
  }
  else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorMessages = err.message ? [{ path: "", message: err.message }] : [];
  }
  else if (err instanceof Error) {
    message = err.message;
    errorMessages = err.message ? [{ path: "", message: err.message }] : [];
  }
  
  res.status(statusCode).json({
    success:false,
    message,
    errorMessages,
    stack: config.env !== 'Production' ? err?.stack:undefined
  }) 
 next()
}

export default globalErrorHandler;