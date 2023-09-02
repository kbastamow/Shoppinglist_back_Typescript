import {Router } from "express";
import { userController } from "../controllers/UserController";
import { createUserValidator } from "../middlewares/validators/userValidator";

export const userRouter:Router = Router()

userRouter.post("/register", createUserValidator, userController.register)
userRouter.post("/login", userController.login)
// userRouter.get("/", userController.getUsers)

