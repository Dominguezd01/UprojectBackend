import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const addColumn = express.Router()


addColumn.post("/columns/add", async (req, res) => {
    const userData = await req.body

    if(!userData || !userData.columnTitle || !userData.boardId){

        return res.status(400).json({
            status: 400,
            message: "Something went wrong"
        })
    }

    let column = await prisma.columns.create({
        data:{
            title: userData.columnTitle
        }
    })

    if(!column){
        return res.status(500).json({
            status: 500,
            message: "Something went wrong"
        })
    }else{
        res.status(200).json({
            status: 200,
            column : column
        })
    }


    let column_board = await prisma.columns_boards.createMany({
        data:{
            board_id: parseInt(userData.boardId),
            column_id: parseInt(column.id)
        }
    })
    
    if(!column_board){
        prisma.$transaction([
            prisma.columns.delete({
                where: {
                    id: parseInt(column.id)
                }
            })
        ])
    }
    
    


})


export default addColumn