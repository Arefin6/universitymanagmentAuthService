import dotEnv from "dotenv";
import path from "path";

dotEnv.config({path:path.join(process.cwd(),'.env')})

export default {
    env: process.env.NodeEnv,
    port:process.env.PORT,
    DbUrl: process.env.DBUrl,
    StudentDefaultPassword:process.env.StudentDefaultPass,
    bcryptSaltRound:process.env.Bcrypt_Salt_Round,
    jwt:{
      secret:process.env.JWT_SECRET,
      refresh_screct:process.env.JWT_REFRESH_SECRET,
      expires_in:process.env.JWT_EXPIRES_IN,
      refresh_expires_in:process.env.JWT_REFRESH_EXPIRES_IN
    } 
}