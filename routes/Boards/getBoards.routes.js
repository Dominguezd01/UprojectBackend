import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const routerGetBoards = express.Router()

routerGetBoards.get("/api/boards", async(req, res)=>{
    const userData = req.query
    console.log(userData)
    let boards = await prisma.boards_users.findMany({
        where:{
            user_id: Number(userData.id)
        },
        select:{
            boards:{
                select:{
                    id: true,
                    name: true,
                    owner: true
                }
            }
        }
    })

    for (let board of boards){
        let ownerName = await prisma.users.findUnique({
            where: {
                id: board.boards.owner
            }
        })
        board.boards.owner = ownerName.name
    }

    res.send(boards)
})

export default routerGetBoards