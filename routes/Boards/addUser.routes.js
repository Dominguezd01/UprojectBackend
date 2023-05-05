import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const addUser = express.Router()

addUser.post("/boards/addUser", async(req, res) =>{
    const userData = await req.body
    console.log(userData)
    try {
        if(!userData){
            return res.status(400).json({messagge: "Something went wrong :C"})
        }
        if(!userData.board_id || !userData.user_id ||!userData.add_user_email){
            return res.status(400).json({ messagge: "Something went wrong" })
        }

        const boardToAdd = await prisma.boards.findUnique({where:{
            id: parseInt(userData.board_id)
        }})

        if(userData.user_id != boardToAdd.owner){
            return res.status(401).json({ messagge: "You are not authorized to do this, talk to the owner" })
        }
        const userToAdd = await prisma.users.findFirst({where: {
            email: userData.add_user_email
        }})
    
        if(!userToAdd){
            return res.status(404).json({ messagge: "User not found, check email" })
        }
    
        const userAlreadyExists = await prisma.boards_users.findFirst({where:{
            user_id: userToAdd.id,
            board_id: boardToAdd.id
        }})
        console.log(userAlreadyExists)
        if(userAlreadyExists){
            return res.status(200).json({ messagge: "User is already in the board" })
        }

        const addUserToBoard = await prisma.boards_users.create({
            data:{
                board_id: boardToAdd.id,
                user_id: userToAdd.id
            }
        })
        return res.status(200).json({ messagge: "User added to the board" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ messagge: "Something went wrong :C" })
    }
   
})

export default addUser