import express from "express"
import {
    addTodo,
    deleteTodo,
    editTodo,
    getTodos,
    toggleTodo
} from "../controller/todo.controller.js"

const router = express.Router()

router.get("/", getTodos)
router.post("/", addTodo)
router.delete("/:id", deleteTodo)
router.put("/toggle/:id", toggleTodo)
router.put("/edit/:id", editTodo)

export default router