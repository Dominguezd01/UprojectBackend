import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const routerRegister = express.Router()

routerRegister.post("/api/register", async(req, res) =>{
    const userData = await req.body
    const salt = bcrypt.genSaltSync(10);
    if(userData){

        if(await prisma.users.create({
            data:{
                name: userData.name,
                email: userData.email,
                profile_picture: userData.profile_picture 
                                    ? userData.profile_picture 
                                    : null,
                password: await bcrypt.hash(userData.password, salt)
    
            }
        })){
            res.sendStatus(200)
        }
         
    }else{
        res.sendStatus(400)
    }

    
})

export default routerRegister