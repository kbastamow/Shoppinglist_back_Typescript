import { Request, Response } from 'express'
import { Db } from '../../config/database'
import { List } from '../entities/list.entity'
import { IAuthRequest } from '../interfaces/IAuthRequest';

class ListController {
    public async createList(req: IAuthRequest, res: Response): Promise<Response> {
        const listRepository = Db.getRepository(List);

        const { title } = req.body
        const newList = new List()
        newList.title = title
        newList.date = new Date()
        newList.total = 0
        newList.active = true

        newList.user = req.user!

        try {
            const createdList = await listRepository.save(newList)
            return res.status(201).send({ msg: "New list created", list: { id: createdList.id, title: createdList.title } })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async getLists(req: IAuthRequest, res: Response): Promise<Response> {
        const listRepository = Db.getRepository(List);
        try {
            const lists: List[] = await listRepository.find({
                where: {
                    user: { id: req.user!.id },
                },
            })
            return res.send(lists)
        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async getListById(req: Request, res: Response): Promise<Response> {

        //VALIDATE: compare user and list owner
        const listRepository = Db.getRepository(List);
        try {
            const list: List | null = await listRepository.findOne({
                where: { id: req.params.id },
                relations: ['items', 'items.category']
            })

            return res.send(list)
        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async updateList(req: Request, res: Response): Promise<Response> {
        //VALIDATE: compare user and list owner
        const listRepository = Db.getRepository(List);
        try {
            await listRepository.update(req.params.id, req.body)

            return res.send({ msg: "List updated" })

        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async deleteList(req: Request, res: Response): Promise<Response> {
        const listRepository = Db.getRepository(List);
        try {
            await listRepository.delete(req.params.id)
            return res.send({ msg: "List Deleted" })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }
}

export const listController = new ListController()