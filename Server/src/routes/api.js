import express from "express";
import Register from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validatorSchema/RegisterSchema.js";
import Login from "../controllers/Login.controller.js";
import { LoginSchema } from "../validatorSchema/LoginSchema.js";

const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post('/register',RegisterSchema,Register);
apiRoute.post('/login',LoginSchema,Login);

//protected routes

//apiProtected.post("/createTodo", createTodo);

export default apiRoute;

