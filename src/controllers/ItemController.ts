import { Request, Response } from "express";
import { Item } from "../entities/item.entity";
import { Db } from "../../config/database";
import { UpdateResult } from "typeorm";


class ItemController {
    public async createItem(req: Request, res: Response): Promise<Response> {
        const itemRepository = Db.getRepository(Item) 
        const newItem = new Item()
        newItem.name = req.body.name
        newItem.collected = false
        newItem.list = req.body.listId   //must be sent together with 

        try {
            const createdItem: Item = await itemRepository.save(newItem)
            return res.status(201).send({ msg: "New item created", item: createdItem })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async getPerList(req: Request, res: Response): Promise<Response> {
        const itemRepository = Db.getRepository(Item)
        try {
            const items: Item[] = await itemRepository.find({ 
                where: { list: 
                    { id: req.params.id } 
                }, 
                relations: {
                    category: true
                }
            })
            return res.send(items)
        } catch (error) {
            console.log(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async updateItem(req: Request, res: Response): Promise<Response> {
        const itemRepository = Db.getRepository(Item)
        try {
            const item:UpdateResult = await itemRepository.update(req.params.id, req.body);
            return res.status(204).send({ msg: "Item updated", item })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async deleteItem(req: Request, res: Response): Promise<Response> {
        const itemRepository = Db.getRepository(Item)
        try {
            const item = await itemRepository.delete(req.body.id)
            return res.status(200).send({ msg: "Item deleted", item })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }
}

export const itemController = new ItemController()