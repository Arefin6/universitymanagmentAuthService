import express, { Application} from "express";
import cors from "cors";
import userRoute from "./app/modules/user.route";
const app:Application = express();

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app routes
app.use('/api/v1/users/',userRoute)

// GET method route
app.get('/', function (req, res) {
    res.send('GET request to the homepage');
});
  
export default app;