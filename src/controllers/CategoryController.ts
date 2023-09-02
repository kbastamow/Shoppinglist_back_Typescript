import { Request, Response } from "express";
import { Category } from "../entities/category.entity";
import { Db } from "../../config/database";


class CategoryController {
    public async create(req: Request, res: Response): Promise<Response> {
        const categoryRepository = Db.getRepository(Category)
        const { categories } = req.body

        //Don't use forEach. Use promise.all to deal with async issues
            try {
                const savedCategories = await Promise.all(categories.map(async (cat: object) => {
                    const category: Category = await categoryRepository.save(cat)
                    return category
                }))
                return res.status(201).send({ msg: "New categories", categories: savedCategories })
            } catch (error) {
                console.error(error)
                return res.status(500).send({ msg: "Internal server error" })
            }
        }
    

    public async getAll(req: Request, res: Response): Promise<Response> {
        const categoryRepository = Db.getRepository(Category)
        try {
            const categories: Category[] = await categoryRepository.find()
            return res.send(categories)
        } catch (error) {
            console.error(error)
            return res.status(500).send("Internal server error")
        }

    }

}


export const categoryController = new CategoryController()