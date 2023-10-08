import { Router } from "express";
import { userController } from "../controllers/UserController";
import { createUserValidator } from "../middlewares/validators/userValidator";
import { authentication } from "../middlewares/authentication/authentication";

export const userRouter: Router = Router()

userRouter.post("/register", createUserValidator, userController.register)
userRouter.put("/login", userController.login)
userRouter.put("/logout", authentication, userController.logout)

