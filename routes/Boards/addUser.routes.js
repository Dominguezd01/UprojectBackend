import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const addUser = express.Router()

addUser.post("/api/boards/addUser", async(req, res) =>{
    const userData = await req.body
    const boardToAdd = await prisma.boards.findUnique({where:{
        id: userData.board_id
    }})

    if(!boardToAdd){
        res.json({status: 404, messagge: "Board not found"})
    }

    if(userData.user_id != boardToAdd.owner){
        res.json({status: 401, messagge: "You are not authorized to do this, talk to the owner"})
    }

    const userToAdd = await prisma.users.findUnique({where: {
        email: userData.add_user_email
    }})

    if(!userToAdd){
        res.json({status: 400, messagge: "User not found, check email"})
    }

    const userAlreadyExists = await prisma.boards_users.findMany({where:{
        user_id: userToAdd.id,
        board_id: boardToAdd.id
    }})
    if(userAlreadyExists){
        res.json({status: 200, messagge: "User is already in the board"})
    }
    const addUserToBoard = await prisma.boards_users.create({
        data:{
            board_id: boardToAdd.id,
            user_id: userToAdd.id
        }
    })
    if(!addUserToBoard){
        res.json({status: 500, messagge: "Something go wrong :C"})
    }
    res.json({status: 200, messagge: "User added to the board"})
})

export default addUser