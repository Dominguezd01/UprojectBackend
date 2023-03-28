import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const routerLogin = express.Router()


routerLogin.post("/api/login", async(req, res)=>{
    console.log(req.body)
    const userExists = await prisma.users.findMany({where:{name:req.body.userName}})

    if(userExists){
        res.send(userExists)
    }

})


export default routerLogin