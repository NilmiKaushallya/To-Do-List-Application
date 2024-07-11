import express from "express";
import Register from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validatorSchema/RegisterSchema.js";
import Login from "../controllers/Login.controller.js";
import { LoginSchema } from "../validatorSchema/LoginSchema.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { check } from "express-validator";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/login',LoginSchema,Login);

// apiRoute.post('/login', (req, res)=>res.send("login"));

//protected routes

apiProtected.post("/createTodo", [check("desc", "Todo desc is required").exists()], createTodo);

export default apiRoute;

