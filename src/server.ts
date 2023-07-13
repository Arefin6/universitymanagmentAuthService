/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import {errorLogger, logger,} from "./shared/logger";
import { Server } from "http";
let server:Server;

process.on('uncaughtException',err=>{
   errorLogger.error(err)
   process.exit(1);
})

async function bootstrap() {
    
    try {
        await mongoose.connect(config.DbUrl as string);
        logger.info("DB Connected Successfully");
        server = app.listen(config.port, () =>{
            logger.info(`listening to ${config.port}`);
        })
    } catch (error) {
        errorLogger.error("Error Connecting to Db",error);
    }

    process.on("unhandledRejection",err=>{
        if(server){
            server.close(()=>{
                errorLogger.error(err)
            })
            process.exit(1)
        }
        else{
            process.exit(1)
        }
    })

 }

 bootstrap();


 process.on('SIGTERM', () => {
    logger.info('SIGTERM is received');
    if (server) {
      server.close();
    }
  });