import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()
const usersBoard = express.Router()


usersBoard.post("/boards/getUsersBoard", async (req, res) =>{
    const userData = req.body

    if(!userData || !userData.id || !userData.userId){
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
        boardsUsers.map( async (user) => {
            if(user.users.id != userData.userId){
                let userId = user.users.id
               sendData.push({
                    [userId]: user.users.name
               })
            }
        })

        return res.status(200).json({status:200, users:sendData})
    }catch(e){
        console.log(e)
        return res.status(500).json({status:500, message: "Something went wrong"})
    }

    
})
const getUsersInfo = async(boardsUsers) =>{
    return sendData
}
export default usersBoard