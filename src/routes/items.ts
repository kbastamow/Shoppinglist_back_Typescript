import { Router } from "express";
import { itemController } from "../controllers/ItemController";



export const itemRouter: Router = Router()

itemRouter.post("/", itemController.createItem)
itemRouter.get("/:id", itemController.getPerList)
itemRouter.put("/", itemController.updateItem)
itemRouter.delete("/", itemController.deleteItem)
