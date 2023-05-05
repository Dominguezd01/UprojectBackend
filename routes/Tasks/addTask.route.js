import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const addTask = express.Router()


addTask.post("/api/tasks/add", async(req , res) => {

    const userData = await req.body

    if(!userData || !userData.columnId || !userData.content){
        return res.status(400).json({status: 400, message: "Something went wrong"})
    }


    let task = await prisma.tasks.create({
        data:{
            content : userData.content,
            state_id: 1
        }
    })


    let states = await prisma.states.findMany()
    if(!task){
        res.status(500).json({status: 500, message: "Internal error"})   
        const deleteUser = await prisma.task.delete({
            where: {
              id: task.id,
            },
          })

        return 
    }
    res.status(200).json({status: 200, task: task, states:states })
    
    let column_tasks = await prisma.columns_tasks.create({
        data:{
            task_id: task.id,
            column_id: parseInt(userData.columnId)
        }
    })



   
})


export default addTask