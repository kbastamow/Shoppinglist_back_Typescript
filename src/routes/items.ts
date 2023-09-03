import { Router } from "express";
import { itemController } from "../controllers/ItemController";



export const itemRouter: Router = Router()

itemRouter.post("/", itemController.createItem)
itemRouter.get("/:listId", itemController.getPerList)
itemRouter.put("/:id", itemController.updateItem)
itemRouter.delete("/:id", itemController.deleteItem)
