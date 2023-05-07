import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const editTask = express.Router()
/**
 * taskId 
 * content 
 * state
 */
editTask.put("/tasks/edit", async(req, res)=>{
    const userData = await req.body
    if(!userData || !userData.taskId || !userData.content || !userData.state || !userData.boardId || !userData.userId || Object.keys(userData.userId).length == 0){
        return res.status(400).json({message: "Something went wrong"})
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
    
    let updateProcess = await prisma.tasks.update({
        where: {
            id: parseInt(userData.taskId)
        },
        data: {
            content: userData.content,
            state_id: parseInt(userData.state)
        },
    })
        


    if(updateProcess){

        return res.status(200).json({status: 200, message: "Task edited"})
    }

    //return res.status(200).json({message: "Okay"})
})


export default editTask