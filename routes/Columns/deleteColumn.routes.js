import express from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const deleteColumn = express.Router()


deleteColumn.delete("/columns/delete", async (req, res) =>{
    const userData = await req.body
    console.log(userData)
    if(!userData || !userData.columnId){
        return res.status(400).json({status: 400, message: "Something went wrong"})
    }


    try {
        await prisma.columns.delete({
            where: {
                id: parseInt(userData.columnId)
            }
        })

        return res.status(200).json({status: 200, message: "Column deleted succesfully"})
    } catch (e) {
        // The .code property can be accessed in a type-safe manner
        return res.status(500).json({
            status: 500,
            message: "Something went wrong :C"
        })
    }

})



export default deleteColumn