import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import routerLogin from "./routes/login.routes.js"
import cors from "cors"
import morgan from "morgan";
import bodyParser from "body-parser";
import routerRegister from "./routes/register.routes.js";

const app = express()
const PORT = process.env.PORT || 3000
const prisma = new PrismaClient()


app.use(cors())
app.use(morgan("dev"))
const jsonParser = bodyParser.json()

app.use(jsonParser)
app.get("/", async (req, res) =>{
    let users = await prisma.users.findMany()
    res.send(users)
})
app.post("/api/login", routerLogin)
app.post("/api/register", routerRegister)
app.listen(PORT, ()=>{
    console.log(`Listening in http://localhost:${PORT}`)
})