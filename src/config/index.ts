import dotEnv from "dotenv";
import path from "path";

dotEnv.config({path:path.join(process.cwd(),'.env')})

export default {
    env: process.env.NodeEnv,
    port:process.env.PORT,
    DbUrl: process.env.DBUrl,
    UserDefaultPassword:process.env.UserDefaultPass
}