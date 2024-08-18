import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect('mongodb+srv://pkash318:YOUR_API_KEY')
.then(()=>{
    console.log("connected to mongoDB");
})       
.catch((err)=>{
    console.log("ERROR"+err);
})   
        
export {mongoose};