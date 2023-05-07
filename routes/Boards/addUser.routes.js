import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const addUser = express.Router()

addUser.post("/boards/addUser", async(req, res) =>{
    const userData = await req.body
    console.log(userData)
    try {
        if(!userData){
            return res.status(400).json({status: 400, message: "Something went wrong :C"})
        }
        if(!userData.board_id || !userData.user_id ||!userData.add_user_email || Object.keys(userData.user_id).length == 0){
            return res.status(400).json({status: 400, message: "Something went wrong" })
        }

        const boardToAdd = await prisma.boards.findUnique({where:{
            id: parseInt(userData.board_id)
        }})
        console.log(boardToAdd)
        if(userData.user_id != boardToAdd.owner){
            return res.status(401).json({status: 401, message: "You are not authorized to do this, talk to the owner" })
        }
        const userToAdd = await prisma.users.findFirst({where: {
            email: userData.add_user_email
        }})
    
        if(!userToAdd){
            return res.status(404).json({ status: 404, message: "User not found, check email adress" })
        }
    
        const userAlreadyExists = await prisma.boards_users.findFirst({where:{
            user_id: userToAdd.id,
            board_id: boardToAdd.id
        }})
        console.log(userAlreadyExists)
        if(userAlreadyExists){
            return res.status(302).json({ status: 302, message: "User is already in the board" })
        }

        const addUserToBoard = await prisma.boards_users.create({
            data:{
                board_id: boardToAdd.id,
                user_id: userToAdd.id
            }
        })
        return res.status(200).json({ status:200, message: "User added to the board" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message:"Something went wrong :C" })
    }
   
})

export default addUser