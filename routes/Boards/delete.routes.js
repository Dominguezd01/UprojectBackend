import express from "express";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const deleteBoard = express.Router()

/**
 * commenbts
 */
deleteBoard.delete("/api/boards/delete", async (req, res) =>{
    const userData = await req.body
    if(!userData){
        return res.status(400).json({message: "An error ocurred"})
    }
 
    if(!userData.boardId || !userData.userId){
        return res.status(400).json({message: "An error ocurred, try again later"})
    }
    try{
        const board = await prisma.boards.findUnique({where:{id: parseInt(userData.boardId)}})

        if(board == null){
            res.json({status: 404, message: "Board not found, try it again later"})
        }
    
        if (board.owner != userData.userId) {
            return res.status(401).json({ message: "You are not the owner, you cant delete the board 😡" })
        }

        await prisma.boards.delete({ where: { id: parseInt(board.id) } })
            
        
    
    }catch(e){
        console.log(e)
        return res.status(500).json({ message: "Something went wrong with us, sorry 😔" })
    }
    
    return res.status(200).json({status: 200, message: "Board removed, we hope it's not the last"})
    

})

export default deleteBoard