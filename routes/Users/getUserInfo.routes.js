import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const getUserInfo = express.Router()


getUserInfo.post("/users/getUserInfo", async (req, res) =>{

    try{
        const userData = await req.body
        if(!userData || !userData.userId){
            return res.status(400).json({status: 400, message: "Something went wrong"})
        }
    
        const userExists = await prisma.users.findUnique({ where: { email: userData.email } })
        
        if (!userExists) {
            return res.status(400).json({ status: 400, message: "Wrong email or password" })
        }
    
        const sendData = {
            name: userExists.name,
            id: userExists.id,
            email: userExists.email,
            proffilePicture: userExists.profile_picture
        }
    
       return res.status(200).json({status: 200, sendData})
    
    }catch(e){
        return res.status(500).json({status: 500, message: "Something went wrong in our servers" })
    }


})

export default getUserInfo