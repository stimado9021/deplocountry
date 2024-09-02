import express from "express"
import Session from "express-session"
import dotenv from "dotenv"
import morgan from "morgan";
import AuthRouter from "./Routes/Auth/Auth.routes.js"
import { __dirname } from "./Utils/RouteAbsolute.util.js"
//Config to Express
const app = express()
const PORT = process.env.PORT || 3000

//Middlewares Global
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(__dirname + "/public"));
dotenv.config()
app.use(morgan("dev"));
//Cookies
app.use(Session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    cookie : {maxAge : 1000 * 60 * 24 * 7}
    
}))


app.use("/api/v0",AuthRouter)


app.listen(PORT,()=>{
    console.log(`Server Running On port ${PORT}`)
})