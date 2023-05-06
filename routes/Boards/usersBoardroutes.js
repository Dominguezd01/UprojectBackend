import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const usersBoard = express.Router()


usersBoard.post("/boards/getUsersBoard", async (req, res) =>{
    const userData = req.body

    if(!userData || !userData.id || userData.userId){
        return res.status(400).json({status: 400, message: "Something went wrong"})
    }
    try{
        let boardsUsers = await prisma.boards_users.findMany({
            where:{           
                board_id: parseInt(userData.id),
            },

            include: {
                users:{
                    select:{
                        id:true,
                        name:true
                    }
                }
            }
        })

        let sendData = []
        boardsUsers.forEach(boardsUser => {
            sendData.push(boardsUser.users)
        });
        return res.send(sendData)
    }catch(e){
        return res.status(500).json({status:500, message: "Something went wrong"})
    }

    
})

export default usersBoard