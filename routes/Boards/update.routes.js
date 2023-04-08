import express from "express";
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()
const updateBoard = express.Router()

updateBoard.put("/api/boards/update", async (req, res) =>{
    const userData = await req.body
    const boardFound = await prisma.boards.findUnique({where: {id: userData.id}})
    if(!boardFound){
        res.json({status: 404, message: "Board not found ;C"})
    }else{
        const updatedBoard = await prisma.boards.update({
            where: {id: boardFound.id},
            data:{
                name: userData.name
            }
        })

        !updatedBoard 
            ? res.json({status: 500, message: "Something go wrong :C"})
            : res.json({status: 200, message: "Board updated"})
    }
})


export default updateBoard