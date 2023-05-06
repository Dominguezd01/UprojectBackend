import express from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const deleteUser = express.Router()

deleteUser.delete("/boards/deleteUser", async (req, res) =>{
    const userData = await req.body
    console.log(userData)
    if(!userData){
       return res.status(400).json({status: 400, message: "Something went wrong, sorry :P"})  
    }

    if(!userData.board_id || !userData.user_id || !userData.user_id_delete){
        return res.status(400).json({message: "Something went wrong with that :C"})
    }

    try{
        const userExists = await prisma.boards_users.findFirst({
            where: {
                board_id: parseInt(userData.board_id),
                user_id : userData.user_id_delete
            }
        })

        if(!userExists){
            return res.status(404).json({status: 404, message: "User not found on this board"})
        }

        const boardExists = await prisma.boards.findUnique({
            where:{
                id: userData.board_id
            }
        })

        if(!boardExists){
            return res.status(400).json({status: 400, message: "Board not found"})
        }

        if(userData.user_id != boardExists.owner){
            return res.status(401).json({status: 401, message: "You are no authorize to do that talk to the owner"})    
        }

        await prisma.boards_users.delete({
            where: {
                id: userExists.id,
            }
        })
        
        return res.status(200).json({status: 200, message: "User deleted from the board succesfully"})
    }catch(e){
        console.log(e)
        return res.status(500).json({status: 500, message: "Something went wrong on our servers, hold on a sec"})
    }

    
})


export default deleteUser