import express from "express";
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
} from "../controllers/todo.js";

const router = express.Router();

// Route to create a new todo
router.post("/create-todo", createTodo);
router.put("/update-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

// Route to get all todos
router.get("/get-todos", getTodos);

export default router;
