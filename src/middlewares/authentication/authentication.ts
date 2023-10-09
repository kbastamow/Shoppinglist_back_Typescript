import { JwtPayload, verify } from "jsonwebtoken";
import dotenv from 'dotenv'
import { NextFunction, Response } from 'express';
import { Db } from '../../../config/database';
import { User } from '../../entities/user.entity';
import { IAuthRequest } from "../../interfaces/IAuthRequest";
// import  {IJwtPayload} from '../../interfaces/IJwtPayload'
dotenv.config()


export const authentication = async (req: IAuthRequest, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return res.status(498).send("Invalid token")
        }

        const payload = verify(token, process.env.JWT_SECRET!) as JwtPayload
        if (!payload) {
            return res.status(498).send("Invalid token")
        }

        const user = await Db.getRepository(User).findOne({
            where: {
                id: payload.id
            }
        })

        if (user) {
            req.user = user
            next()
        }

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error, msg: "Internal server error" });
    }
}

