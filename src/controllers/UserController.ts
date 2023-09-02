import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator/src/validation-result';
// import { sign, verify } from 'jsonwebtoken';
import { Db } from '../../config/database';
import { User } from '../entities/user.entity';
import dotenv from 'dotenv'
import { sign } from 'jsonwebtoken';
dotenv.config()


//Confirmation missing!

class UserController {
    public async register(req: Request, res: Response): Promise<Response> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }
        const { username, email, password } = req.body
        //Instantiate User entity (not strictly necessary)
        const newUser = new User();
        newUser.username = username;
        newUser.email = email;
        newUser.password = await bcrypt.hash(password!, 10);
        newUser.confirmed = false;
        try {
            const createdUser: User = await Db.getRepository(User).save(newUser);
            return res.status(201).send({ msg: "New user created", user: createdUser })
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).send({ msg: 'Internal server error' });
        }
    }

    public async login(req: Request, res: Response): Promise<Response> {
        console.log(req.body)

              try {
            const user = await Db.getRepository(User).findOne({ where: { email: req.body.email } })
            if (!user) {
                return res.status(400).send({ msg: "Incorrect username or password." })
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({ msg: "Incorrect username or password." })
            }
            const token = sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "14d" });

            // Update the user entity with the new token
            user.token = token;

            // Save the user back to the database
            await Db.getRepository(User).save(user);
            console.log(user)

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, confirmed, ...limitedDetails } = user;

            return res.send( limitedDetails );

        } catch (error) {
            console.error(error)
            return res.status(500).send({ msg: 'Internal server error' });

        }
    }

    // public async getUsers(req:Request, res: Response): Promise<Response> {
    //     const users: User[] = await Db.getRepository(User).find({
    //         relations: {
    //             lists: true
    //         }
    //     })
    //     return res.send(users)
    // }
}


export const userController = new UserController();
