import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const editColumnTitle = express.Router()

editColumnTitle.put("/columns/editColumnTitle", async (req, res) =>{
    const userData = await req.body

    if(!userData || !userData.columnId || !userData.columnTitle ||  !userData.boardId || !userData.userId){
        return res.status(400).json({status: 400, message: "Something went wrong"})
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
    
    try{
        let column = await prisma.columns.update({
            where: {
                id: userData.columnId
            },
            data:{
                title: userData.columnTitle
            }
        })
        return res.status(200).json({state: 200})
    }catch (e) {
        // The .code property can be accessed in a type-safe manner
        return res.status(500).json({
            status: 500,
            message: "Something went wrong :C"
        })
    }
})



export default editColumnTitle