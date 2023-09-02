import { Router } from "express";
import { listController } from "../controllers/ListController";
import { authentication } from "../middlewares/authentication/authentication";


export const listRouter: Router = Router()

listRouter.post("/", authentication, listController.createList)
listRouter.get("/:id", listController.getListById)