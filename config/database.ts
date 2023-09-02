import { DataSource } from 'typeorm';
import dotenv from 'dotenv'
import { User } from '../src/entities/user.entity';
import { List } from '../src/entities/list.entity';
import { Item } from '../src/entities/item.entity';
import { Category } from '../src/entities/category.entity';
dotenv.config()


export const Db = new DataSource({
   type: 'mysql',
   host: 'localhost',
   port: 3306,
   username: "root",
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   entities: [User, List, Item, Category],
   synchronize: true
  })
  
Db.initialize().then(()=> {
  console.log("Connected to database")
})

