import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const routerGetBoards = express.Router()

routerGetBoards.get("/boards/:id", async(req, res)=>{
    const userData = req.params
    if(!userData){
        return res.status(400).json({
            status: 400,
            message: "Something went wrong"
        })
    }

    let userBoards = await prisma.boards_users.findMany({
        where:{
            user_id: userData.id
        },
        include:{
            boards: {
                select:{
                    id: true,
                    name: true,
                    owner: true
                }
            }
        }   
    })
    console.log(userBoards)
    
    let boardsInfo = []

    for (let userBoard of userBoards){
        let ownerName = await prisma.users.findUnique({where: {id: userBoard.boards.owner}})
        let boardToPush = {}
        boardToPush.owner = ownerName.name
        boardToPush.name = userBoard.boards.name
        boardToPush.id = userBoard.boards.id

        boardsInfo.push(boardToPush)    
    }


    return res.status(200).json({boards: boardsInfo})
})

export default routerGetBoards