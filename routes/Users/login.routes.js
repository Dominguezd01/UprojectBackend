import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const routerLogin = express.Router()


routerLogin.post("/api/users/login", async (req, res) => {
    const userData = await req.body
    if (!userData) {
        return res.sendStatus(400).json("Something broke")
    }

    const userExists = await prisma.users.findUnique({ where: { email: userData.email } })
    
    if (!userExists) {
        return res.status(400).json({ status: 400, message: "Wrong email or password" })
    }

    bcrypt.compare(userData.password, userExists.password, (err, result) => {
        if (err) {
            return res.sendStatus(500).json({ message: "Something goes wrong" })
        }
        if (result) {
            const sendData = {
                name: userExists.name,
                id: userExists.id,
                proffilePicture: userExists.profile_picture
            }

           return res.json({status: 200, sendData, message: "Good to see you again :D" })
        } else {
            return res.status(401).json({ message: "Wrong email or password" })
        }
    })


})


export default routerLogin