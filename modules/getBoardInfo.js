import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

const getBoardInfo = async (board) => {
    let boardInfo = []
    let columnsInfo = []
  

    let columns_boards = await prisma.columns_boards.findMany({
        where: {
            board_id: board.id
        }
    })

    let ownerName = await prisma.users.findUnique({ where: { id: board.owner } })
    let boardNameAndId = {
        id: board.id,
        name: board.name,
        owner: board.owner,
        ownerName: ownerName.name
    }

    boardInfo.push(boardNameAndId)
    
    for (let column_board of columns_boards) {
        let tasksInfo = []
        let column = await prisma.columns.findUnique({
            where: {
                id: column_board.column_id
            }
        })
        //column)
        let tasksId = await prisma.columns_tasks.findMany({
            where: {
                column_id: column.id,
            },

        })
        if(tasksId){
            for(let id of tasksId){
                let task = await prisma.tasks.findMany({
                    where: {
                        id: id.task_id
                    }
                })
                tasksInfo.push(task) 
            }
        }


       

    
        let columnInfo = {
            id: column_board.column_id,
            title: column.title,
            tasks: tasksInfo
        }



        //columnsInfo
        columnsInfo.push(columnInfo)
        
    }
    
    //columnsInfo)
    boardInfo.push({ columns: columnsInfo })
    let states = await prisma.states.findMany()
    boardInfo.push(states)
    return boardInfo



}



export default getBoardInfo