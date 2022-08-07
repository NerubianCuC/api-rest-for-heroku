import  express  from "express";
import "dotenv/config"
import"./database/configDB.js"
import routAuth from './routers/auth.route.js'
import linkRouter from './routers/link.router.js'
import redirectRouter from "./routers/redirect.link.js"
import cookieParser from "cookie-parser";
import cors from "cors"


const app =  express() 

const whiteList= [process.env.ORIGIN1]
app.use(cors({
    origin:function(origin,callback){
        if(whiteList.includes(origin)){
            return callback(null, origin)
        }
        return callback("Error de CORS origin: "+ origin + " No autorizado" )
    }
}))
app.use(express.json())
app.use (cookieParser())
app.use('/',redirectRouter)
app.use('/api/v1/auth',routAuth)
app.use('/api/v1/links',linkRouter)
app.use(express.static("public"))
const PORT = process.env.PORT|| 5000
app.listen(5000, ()=>console.log("Server UP   http://localhost:" + PORT))