import { Router } from "express";
import { listController } from "../controllers/ListController";
import { authentication } from "../middlewares/authentication/authentication";


export const listRouter: Router = Router()

listRouter.post("/", authentication, listController.createList)
listRouter.put("/:id", listController.updateList)
listRouter.get("/", authentication, listController.getActiveLists)
listRouter.get("/:id", listController.getListById)