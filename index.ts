import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import { userRouter } from './src/routes/users'
import { listRouter } from './src/routes/lists'
import { itemRouter } from './src/routes/items'
import { categoryRouter } from './src/routes/categories'
import cors from 'cors'
dotenv.config()


const app: Express = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/lists", listRouter)
app.use("/items", itemRouter)
app.use("/categories", categoryRouter)

app.get("/", (req: Request, res: Response) => { res.send("Express-Typescript Server")} )

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})