import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const routerCreateBoard = express.Router()

routerCreateBoard.post("/boards/create", async(req, res)=>{
    const userData = await req.body
    if(!userData || !userData.board_name || !userData.userId){
        return res.status(400).json({status: 400,message: "Something go wrong"})
    } 

    try{
        const board = await prisma.boards.create({
            data:{
                name : userData.board_name,
                owner: userData.userId
            }
        })
   
        const userBoard = await prisma.boards_users.create({
            data: {
                board_id: board.id,
                user_id: userData.userId
            }
        })
        
        const column = await prisma.columns.create({
            data:{
                title: "Your first column"
            }
        })
    
        const column_board = await prisma.columns_boards.create({
            data: {
                board_id: board.id,
                column_id: column.id
            }
        })
    
        const task = await prisma.tasks.create({
            data:{
                content: "Your first task!",
                state_id: 1
            }
        })
    
        const column_task = await prisma.columns_tasks.create({
            data:{
                task_id: task.id,
                column_id: column.id
            }
        })

        return res.status(200).json({status:200, board: board})
    }catch(error){
 
        return res.status(500).json({status: 500, message: "Internal server error"})
    }
   

   

    

})


export default routerCreateBoard