import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: string
    @Column({ type: 'varchar', length: 45, default: "No Category" })
    name: string
}