import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { List } from "./list.entity";
import { Category } from "./category.entity";


@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: string
  @Column({ type: 'varchar', length: '45' })
  name: string
  @Column({ type: 'boolean', default: false })
  collected: boolean
  @ManyToOne(() => List, (list) => list.items)
  list: List
  //Not saved in Category list
  @ManyToOne(() => Category)
  category: Category
}
