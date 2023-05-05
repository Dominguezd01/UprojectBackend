/**
 * Modules imports
 */

import express from "express";
import { PrismaClient } from '@prisma/client'
import cors from "cors"
import morgan from "morgan";
import bodyParser from "body-parser";

/**
 * Routes imports
 */
import routerLogin from "./routes/Users/login.routes.js"
import routerRegister from "./routes/Users/register.routes.js";
import routerGetBoards from "./routes/Boards/getBoards.routes.js";
import routerCreateBoard from "./routes/Boards/createBoard.routes.js";
import deleteBoard from "./routes/Boards/delete.routes.js";
import updateBoard from "./routes/Boards/update.routes.js";
import addUser from "./routes/Boards/addUser.routes.js";
import deleteUser from "./routes/Boards/deleteUser.routes.js";
import viewBoard from "./routes/Boards/viewBoard.routes.js";
import editTask from "./routes/Tasks/editTask.routes.js";
import deleteTask from "./routes/Tasks/deleteTask.routes.js";
import addTask from "./routes/Tasks/addTask.route.js";
import addColumn from "./routes/Columns/addColumn.routes.js";
import deleteColumn from "./routes/Columns/deleteColumn.routes.js";
import editColumnTitle from "./routes/Columns/editColumnTitle.routes.js";
/**
 * Consts
 */
const app = express()
const PORT = process.env.PORT || 3000
const prisma = new PrismaClient()
const jsonParser = bodyParser.json()
/**
 * Middlewares
 */

app.use(cors())
app.use(morgan("dev"))
app.use(jsonParser)
 

/**
 * Routes
 */

//User Routes
app.post("/api/users/login", routerLogin)
app.post("/api/users/register", routerRegister)

//Boards routes
app.get("/api/boards/:id", routerGetBoards)
app.get("/api/boards/view/:id/:userId", viewBoard)
app.post("/api/boards/create", routerCreateBoard )
app.delete("/api/boards/delete" , deleteBoard)
app.put("/api/boards/update", updateBoard)
app.post("/api/boards/addUser", addUser)
app.delete("/api/boards/deleteUser" , deleteUser)
app.put("/api/tasks/edit", editTask)
app.delete("/api/tasks/delete", deleteTask)
app.post("/api/tasks/add", addTask)





/**
 * columns Routes
 */

app.post("/api/columns/add", addColumn)
app.delete("/api/columns/delete", deleteColumn)
app.put("/api/columns/editColumnTitle", editColumnTitle)
/**
 * Listener
 */
app.listen(PORT, ()=>{
    console.log(`Listening in http://localhost:${PORT}`)
})