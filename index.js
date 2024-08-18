import express from "express"
const app=express();

import {mongoose} from "./config/db.js"
import { router } from "./config/routes.js";
app.use(express.json());
const port=3000;
app.get('/',(req,res)=>{
    res.send("Hello, Welcome to backend of e-DUKAAN");
})
app.use('/',router);
app.listen(port,()=>{
    console.log(`app is listening at ${port}`);
})
