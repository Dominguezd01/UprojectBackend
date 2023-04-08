import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const routerLogin = express.Router()


routerLogin.post("/api/users/login", async (req, res) => {
    const userData = await req.body
    if (!userData) {
        res.sendStatus(400).json("Something broke")
    }
    const userExists = await prisma.users.findUnique({ where: { email: userData.email } })
    if (!userExists) {
        return res.json({ status: 400, message: "Not user Found" })
    }

    bcrypt.compare(userData.password, userExists.password, (err, result) => {
        if (err) {
            res.sendStatus(500).json({ message: "Something goes wrong" })
        }
        if (result) {
            const sendData = {
                name: userExists.name,
                id: userExists.id
            }
            res.json({ sendData, message: "Good to see you again :D" })
        } else {
            res.sendStatus(401).json({ message: "Wrong email or password" })
        }
    })


})


export default routerLogin