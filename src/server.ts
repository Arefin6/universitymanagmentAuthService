/* eslint-disable no-console */
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function bootstrap() {
    try {
        await mongoose.connect(config.DbUrl as string);
        console.log("DB Connected Successfully");
        app.listen(config.port, () =>{
            console.log(`listening to ${config.port}`);
        })
    } catch (error) {
        console.log("Error Connecting to Db",error);
    }

 }

 bootstrap();