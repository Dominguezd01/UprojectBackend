import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const deleteUser = express.Router()

deleteUser.delete("/api/boards/deleteUser", async (req, res) =>{
    const userData = await req.body

    if(Object.keys(userData).length == 0){
        res.json({status: 400, message: "Something went wrong, sorry :P"})
        return
    }

    const boardExists = await prisma.boards.findUnique({
        where:{
            id: Number(userData.board_id)
        }
    })

    if(userData.user_id != boardExists.owner){
        res.json({status: 401, message: "You are no authorize to do that talk to the owner"})
        return
    }
    
    const userExists = await prisma.boards_users.findFirst({
        where: {
            board_id: boardExists.id,
            user_id : userData.user_id_delete
        }
    })
    
    if(!boardExists){
        res.json({status: 404, message: "Board not found"})
        return
    }
    if(!userExists){
        res.json({status: 404, message: "User not found on this board"})
        return
    }
    
    const deleteProcess = await prisma.boards_users.delete({
        where: {
            id: userExists.id
        }
    })

    if(!deleteProcess){
        res.json({status: 500, message: "Something went wrong on our servers, hold on a sec"})
        return
    }

    res.json({status: 200, message: "User deleted from the board succesfully"})
    
})


export default deleteUser