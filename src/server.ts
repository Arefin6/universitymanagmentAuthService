/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
import {errorLogger, logger,} from "./shared/logger";

async function bootstrap() {
    try {
        await mongoose.connect(config.DbUrl as string);
        logger.info("DB Connected Successfully");
        app.listen(config.port, () =>{
            logger.info(`listening to ${config.port}`);
        })
    } catch (error) {
        errorLogger.error("Error Connecting to Db",error);
    }

 }

 bootstrap();