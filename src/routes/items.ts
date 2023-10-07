import { Router } from "express";
import { itemController } from "../controllers/ItemController";
import { authentication } from "../middlewares/authentication/authentication";

export const itemRouter: Router = Router()

itemRouter.post("/", authentication, itemController.createItem)
itemRouter.get("/:listId", authentication, itemController.getPerList)
itemRouter.put("/:id", authentication, itemController.updateItem)
itemRouter.put("/category/:id", authentication, itemController.updateCategory)
itemRouter.delete("/:id", authentication, itemController.deleteItem)
