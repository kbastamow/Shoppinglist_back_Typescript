import { Request, Response } from 'express'
import { Db } from '../../config/database'
// import { User } from '../entities/user.entity'
import { List } from '../entities/list.entity'
import { IAuthRequest } from '../interfaces/IAuthRequest';
// import { User } from '../entities/user.entity';


class ListController {
    public async createList(req: IAuthRequest, res: Response): Promise<Response> {
        const listRepository = Db.getRepository(List);
        // const userRepository = Db.getRepository(User);

        const { title } = req.body
        const newList = new List()
        newList.title = title
        newList.date = new Date()
        newList.total = 0
        newList.active = true
      
        newList.user = req.user!
        console.log(req.user)

        try {
            const createdList = await listRepository.save(newList)
            return res.status(201).send({ msg: "New list created", list: createdList })
        } catch (error) {
            console.log(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }

    public async getListById(req: Request, res: Response): Promise<Response> {

        //VALIDATE: compare user and list owner

        const listRepository = Db.getRepository(List);
        try {
            const list: List | null = await listRepository.findOne({
                where: { id: req.params.id },
                relations: {
                    items: true
                }
            })
            return res.send(list)
        } catch (error) {
            console.log(error)
            return res.status(500).send({ msg: "Internal server error" })
        }
    }
}

export const listController = new ListController()