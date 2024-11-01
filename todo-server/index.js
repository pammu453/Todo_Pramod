import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import todoRouter from './route/todo.route.js'

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://javascript:javascript@cluster0.zku1h.mongodb.net/")
    .then(() => {
        console.log("Database connected succefully!")
    }).catch((error) => {
        console.log(error.message)
    })

app.use("/api/", todoRouter)

app.listen(5000, () => {
    console.log("Server is listening on post 5000!")
})