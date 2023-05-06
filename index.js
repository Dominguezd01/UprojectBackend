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
import usersBoard from "./routes/Boards/usersBoardroutes.js";
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
 
app.get("/", (req, res) =>{
    res.send("IS UP BABY")
})

/**
 * Routes
 */

//User Routes
app.post("/users/login", routerLogin)
app.post("/users/register", routerRegister)

//Boards routes
app.get("/boards/:id", routerGetBoards)
app.get("/boards/view/:id/:userId", viewBoard)
app.post("/boards/create", routerCreateBoard )
app.delete("/boards/delete" , deleteBoard)
app.put("/boards/update", updateBoard)
app.post("/boards/addUser", addUser)
app.delete("/boards/deleteUser" , deleteUser)
app.put("/tasks/edit", editTask)
app.delete("/tasks/delete", deleteTask)
app.post("/tasks/add", addTask)
app.post("/boards/getUsersBoard", usersBoard)




/**
 * columns Routes
 */

app.post("/columns/add", addColumn)
app.delete("/columns/delete", deleteColumn)
app.put("/columns/editColumnTitle", editColumnTitle)
/**
 * Listener
 */
app.listen(PORT, ()=>{
    console.log(`Listening in http://localhost:${PORT}`)
})