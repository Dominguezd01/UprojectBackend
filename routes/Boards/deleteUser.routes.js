import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const deleteUser = express.Router()

deleteUser.delete("/api/boards/deleteUser", async (req, res) =>{
    const userData = await req.body

    if(!userData){
       return res.json({status: 400, message: "Something went wrong, sorry :P"})  
    }

    if(!userData.board_id || !userData.user_id || !userData.user_id_delete){
        return res.status(400).json({message: "Something went wrong with that :C"})
    }
    const boardExists = await prisma.boards.findUnique({
        where:{
            id: Number(userData.board_id)
        }
    })

    if(userData.user_id != boardExists.owner){
        return res.json({status: 401, message: "You are no authorize to do that talk to the owner"})
        
    }
    
    const userExists = await prisma.boards_users.findFirst({
        where: {
            board_id: boardExists.id,
            user_id : userData.user_id_delete
        }
    })
    
    if(!boardExists){
        return res.json({status: 404, message: "Board not found"})
        
    }
    if(!userExists){
        return res.json({status: 404, message: "User not found on this board"})
        
    }
    
    const deleteProcess = await prisma.boards_users.delete({
        where: {
            id: userExists.id
        }
    })

    if(!deleteProcess){
        return res.json({status: 500, message: "Something went wrong on our servers, hold on a sec"})
        
    }

    res.json({status: 200, message: "User deleted from the board succesfully"})
    
})


export default deleteUser