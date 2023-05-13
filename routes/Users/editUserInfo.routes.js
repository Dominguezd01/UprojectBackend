import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const editUserInfo = express.Router()

editUserInfo.post("/users/edit", async (req, res) => {
    try {
        const userData = await req.body
        const salt = await bcrypt.genSalt(10)

        if (!userData || !userData.userId || !userData.oldPass || !userData.userName) {
            return res.status(400).json({ status: 400, message: "We did something bad it doesn't feel good" })
        }

        console.log(await bcrypt.hash(userData.oldPass, salt))

        let userToEdit = await prisma.users.findUnique({
            where: {
                id: userData.userId
            }
        })

        bcrypt.compare(userData.oldPass, userToEdit.password, async (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Something went wrong" })
            }
            if (result) {
                let passToSave

                userData.newPass ? passToSave = userData.newPass : passToSave = userData.oldPass
                let update = await prisma.users.update({
                    where: {
                        id: userToEdit.id
                    },
                    data: {
                        name: userData.userName,
                        email: userData.email,
                        password: await bcrypt.hash(passToSave, salt),
                    }
                })  
                let sendData = {name: update.name}
                return res.status(200).json({status: 200, sendData ,message: "Profile updated correctly"})
            } else {
                return res.status(401).json({ status: 401, message: "Wrong password" })
            }
        })


        console.log(userToEdit)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ status: 500, message: "Something went really wrong in the server" })
    }
})

export default editUserInfo