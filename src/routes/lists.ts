import { Router } from "express";
import { listController } from "../controllers/ListController";
import { authentication } from "../middlewares/authentication/authentication";

export const listRouter: Router = Router()

listRouter.post("/", authentication, listController.createList)
listRouter.put("/:id", authentication, listController.updateList)
listRouter.get("/", authentication, listController.getLists)
listRouter.get("/:id", authentication, listController.getListById)
listRouter.delete("/:id", authentication, listController.deleteList)