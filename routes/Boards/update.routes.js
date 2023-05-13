import express from "express";
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const updateBoard = express.Router()

updateBoard.put("/boards/update", async (req, res) =>{
    try{
        const userData = await req.body
        console.log(userData)
        if(!userData){
            return res.status(400).json({ message: "Something went wrong :C" })
        }

        if(!userData.name || !userData.userId || !userData.boardId){
            return res.status(400).json({ message: "We did something bad it doesn't feel good" })    
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
        
        const boardFound = await prisma.boards.findUnique({where: {id: parseInt(userData.boardId)}})

        if(!boardFound){
            return res.status(404).json({status: 404, message: "Board not found ;C"})
        }

        if(boardFound.owner != userData.userId){
            return res.status(401).json({status: 400, message: "Only the owner can do that"})
        }
    
        await prisma.boards.update({
            where: { 
                id: boardFound.id
            },
            data: {
                name: String(userData.name)
            }
        })
        
        return res.status(200).json({ message: "Board updated" })


    }catch(e){
        console.log(e)
        return res.status(500).json({ status:500, message: "Something went wrong :C" })
    }
})


export default updateBoard