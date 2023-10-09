import { Router } from "express";
import { categoryController } from "../controllers/CategoryController";

export const categoryRouter: Router = Router()

categoryRouter.post("/createMany", categoryController.create)
categoryRouter.get("/", categoryController.getAll)