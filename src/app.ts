import express, { Application } from "express";
import cors from "cors";
const app:Application = express();

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// GET method route
app.get('/', function (req:any, res) {
    res.send('GET request to the homepage');
});
  
export default app;