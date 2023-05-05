import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import generateUUID from "../../modules/generateUUID.js"

const prisma = new PrismaClient()
const routerRegister = express.Router()

routerRegister.post("/api/users/register", async(req, res) =>{
    const userData = await req.body
    const salt = await bcrypt.genSalt(10)
    if(userData){
        if(!userData.name || !userData.email || !userData.password){
            return res.status(400).json({message: "Something went wrong with that :C"})
        }

        const emailAlreadyInUse = await prisma.users.findUnique({where: {email: userData.email}})

        if(emailAlreadyInUse){
            return res.status(400).json({status: 400, message:"Email already in use"})
        }
        const userCreated = await prisma.users.create({
            data:{
                id:  String(await generateUUID()),
                name: userData.name,
                email: userData.email,
                profile_picture: userData.profile_picture 
                                    ? userData.profile_picture 
                                    : null,
                password: await bcrypt.hash(userData.password, salt)
            }
        })

        if(userCreated){    
            return res.json({message: "Welcome aboard you pretty human :D"})
        }else{
            return res.status(500).json({message: "Something went really wrong but dotn worrry its our fault :C"})
        }
         
    }else{
        res.status(400).json({message: "Something is not working as intended, my bad :P"})
    }

    
})

export default routerRegister