import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const routerCreateBoard = express.Router()

routerCreateBoard.post("/api/boards/create", async(req, res)=>{
    const userData = await req.body

    if(!userData){
        res.statusCode(400).send("Something go wrong")
    }
    const board = await prisma.boards.create({
        data:{
            name : userData.board_name,
            owner: userData.user_id
        }
    })

    const userBoard = await prisma.boards_users.create({
        data: {
            board_id: board.id,
            user_id: userData.user_id
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
    
    console.log(column_board)
    res.send(board)

    

})


export default routerCreateBoard