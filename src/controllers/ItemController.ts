import { Request, Response } from "express";
import { Item } from "../entities/item.entity";
import { Db } from "../../config/database";
import { UpdateResult } from "typeorm";
import { Category } from "../entities/category.entity";
// import {
//     instanceToPlain,
// } from 'class-transformer';

class ItemController {
    public async createItem(req: Request, res: Response): Promise<Response> {
        const itemRepository = Db.getRepository(Item)
        const newItem = new Item()
        newItem.name = req.body.name
        newItem.collected = false
        newItem.list = req.body.listId   //must be sent together with  

        try {
            const createdItem: Item = await itemRepository.save(newItem)
            return res.status(201).send(createdItem)
        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async getPerList(req: Request, res: Response): Promise<Response> {
        const itemRepository = Db.getRepository(Item)
        try {
            const items: Item[] = await itemRepository.find({
                where: {
                    list:
                        { id: req.params.id }
                },
                relations: {
                    category: true
                }
            })
            return res.send(items)
        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async updateCategory(req: Request, res: Response): Promise<Response> {
        const itemRepository = Db.getRepository(Item)
        const categoryRepository = Db.getRepository(Category)

        //At the moment, client sends category name, not id, so find in DB:
        try {
            const categoryId = await categoryRepository.findOne({
                where: { name: req.body.category.name }
            })
            if (categoryId) {
                req.body.category = categoryId.id
            }
        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }

        try {
            // repository.update does not return the updated object:
            const item: UpdateResult = await itemRepository.update(req.params.id, req.body);
            if (item) {
                const updatedItem = await itemRepository.findOne({
                    where: { id: req.params.id },
                    relations: {
                        category: true
                    }
                });
                // const updatedItemPlain = instanceToPlain(updatedItem) //not sure if necessary
                return res.status(200).send(updatedItem)
            } else {
                return res.status(400).send({ msg: "Category could not be updated" })
            }

        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    //Updates item  without category
    public async updateItem(req: Request, res: Response): Promise<Response> {
        const itemRepository = Db.getRepository(Item)
        //Remove categoryinfo from req.body
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { category, ...formattedData } = req.body
        try {
            // repository.update does not return the updated object:
            const item: UpdateResult = await itemRepository.update(req.body.id, formattedData);
            if (item.affected === 1) {
                const updatedItem = await itemRepository.findOne({
                    where: { id: req.params.id },
                    relations: {
                        category: true
                    }
                });
                return res.status(200).send(updatedItem)
            } else {
                return res.status(400).send({ msg: "Item could not be updated" })
            }

        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async deleteItem(req: Request, res: Response): Promise<Response> {
        const itemRepository = Db.getRepository(Item)
        try {
            await itemRepository.delete(req.params.id)
            return res.status(200).send({ msg: "Item deleted" })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }
}

export const itemController = new ItemController()