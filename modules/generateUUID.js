import { v4 as uuidv4 } from "uuid"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const generateUUID = async () =>{
    let id= uuidv4()
    let idExists = await prisma.users.findUnique({where: {
        id: id
    }})

    if(idExists){
        generateUUID()
    }else{
        return id
    }

}


export default generateUUID