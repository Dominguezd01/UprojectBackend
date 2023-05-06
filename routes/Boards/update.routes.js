import express from "express";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const updateBoard = express.Router()

updateBoard.put("/boards/update", async (req, res) =>{
    const userData = await req.body

    if(!userData){
        return res.status(400).json({ message: "Something went wrong :C" })
    }

    if(!userData.name || !userData.userId || !userData.boardId){
        return res.status(400).json({ message: "Something went wrong :C" })    
    }

    let userInBoard = await prisma.boards_users.findFirst({
        where: {
            user_id: userData.userId,
            board_id: parseInt(userData.boardId)
        }
    })
    
    if(!userInBoard){
        return res.status(401).json({status: 401, message: "You are not part of this board"})
    }
    
    const boardFound = await prisma.boards.findUnique({where: {id: userData.board_id}})

    if(!boardFound){
       return res.json({status: 404, message: "Board not found ;C"})
    }

    if(!boardFound.owner != userData.user_id){
        return res.status(401).json({message: "Only the owner can do that"})
    }

    const updatedBoard = await prisma.boards.update({
        where: { id: boardFound.board_id },
        data: {
            name: userData.name
        }
    })

    if (!updateBoard) {
        return res.status(500).json({ message: "Something went wrong :C" })
    }

    return res.status(200).json({ message: "Board updated" })
    
})


export default updateBoard