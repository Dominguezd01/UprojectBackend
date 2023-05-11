import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const getUserInfo = express.Router()


getUserInfo.post("/users/getUserInfo", async (req, res) =>{
    const userData = await req.body

    if(!userData || !userData.password || !userData.userId){
        return res.status(400).json({status: 400, message: "Something went wrong"})
    }

    const userExists = await prisma.users.findUnique({ where: { email: userData.email } })
    
    if (!userExists) {
        return res.status(400).json({ status: 400, message: "Wrong email or password" })
    }

    bcrypt.compare(userData.password, userExists.password, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Something went wrong" })
        }
        if (result) {
            const sendData = {
                name: userExists.name,
                id: userExists.id,
                email: userExists.email,
                proffilePicture: userExists.profile_picture
            }

           return res.status(200).json({status: 200, sendData, message: "Good to see you again :D" })
        }
    })

    return res.status(200).json({status: 200})
})

export default getUserInfo