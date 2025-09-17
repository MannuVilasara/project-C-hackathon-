import expresss from "express";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.routes.js";
import cors from "cors"

const app=expresss()

//database connection
connectDB()
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

//middlewares
app.use(expresss.json())
app.use(expresss.urlencoded({extended:true}))
app.use(cookieParser())
app.set("trust proxy", true); // if using proxy/vercel/nginx

app.get("/",(req,res)=>{
    res.send("Api is running....");
})
app.use('/api/user',userRoutes)

//server listening  
app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})