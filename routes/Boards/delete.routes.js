import express from "express";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const deleteBoard = express.Router()


deleteBoard.delete("/api/boards/delete", async (req, res) =>{
    const userData = await req.body
  
    const board = await prisma.boards.findUnique({where:{id: userData.id}})

    if(board == null){
        res.json({status: 404, message: "Board not found, try it again later"})
    }else{
        await prisma.boards_users.deleteMany({where: {board_id: board.id}})
        await prisma.boards.delete({where: {id: board.id}})
        res.json({status: 200, message: "Board deleted Successfully"})
    }

})

export default deleteBoard