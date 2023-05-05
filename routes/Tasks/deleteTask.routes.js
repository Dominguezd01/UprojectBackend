import express from "express";
import { PrismaClient } from '@prisma/client'
import { Prisma } from "@prisma/client";
const prisma = new PrismaClient()
const deleteTask = express.Router()

deleteTask.delete("/api/tasks/delete", async (req, res) =>{
    const userData = await req.body

    if(!userData || !userData.taskId){
        return res.status(400).json({status: 400, message : "Something went wrong"})
    }
    
    try {
        await prisma.tasks.delete({
            where: {
                id: userData.taskId
            }
        })
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          // The .code property can be accessed in a type-safe manner
          return res.status(500).json({
            status: 500,
            message: "Something went wrong :C"
        })
        }
    }




    return res.status(200).json({status: 200})
    

})
export default deleteTask