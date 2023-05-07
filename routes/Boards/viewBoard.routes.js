import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import getBoardInfo from "../../modules/getBoardInfo.js";

const prisma = new PrismaClient()
const viewBoard = express.Router()


viewBoard.post("/boards/view", async (req, res) =>{
 
    let userData = await req.body
    console.log(userData)

    if(!userData || !userData.boardId || !userData.userId || !Object.keys(userData.userId)){
        return res.status(400).json({status: 400, message: "Something went wrong"})
    }


    let boardFound = await prisma.boards.findUnique({
        where: {
            id: parseInt(userData.boardId)
        }
    })


    let userInBoard = await prisma.boards_users.findFirst({where: {
        board_id: parseInt(userData.boardId),
        user_id: userData.userId
    }})
    
    if(!userInBoard){
        return res.status(404).json({status: 404, message: "Board not found"})
    }
    
    let board = await getBoardInfo(boardFound)

    return res.status(200).json({status: 200, board})
})
 
export default viewBoard