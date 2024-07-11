import express from "express";
import Register from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validatorSchema/RegisterSchema.js";
import Login from "../controllers/Login.controller.js";
import { LoginSchema } from "../validatorSchema/LoginSchema.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/TodoList.controller.js";
import { MarkTodo } from "../controllers/MarkTodo.controller.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/login',LoginSchema,Login);

//protected routes
apiProtected.post("/createTodo", [check("desc", "Todo desc is required").exists()], createTodo);
apiProtected.post("/marktodo", [check("todo_id", "Todo id is required").exists()], MarkTodo);
apiProtected.get("/todolist", GetTodos);

export default apiRoute;

