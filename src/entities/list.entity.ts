import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Item } from "./item.entity";


@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: string
    @Column({
        type: 'varchar',
        length: 45,
        default: 'New List'
    })
    title: string
    @Column({ type: 'timestamp', default: () => "now()" })
    date: Date
    @Column({ type: 'boolean', default: true })
    active: boolean
    @Column({ type: 'float', nullable: true, default: 0 })
    total: number
    @ManyToOne(() => User, (user) => user.lists)
    user: User //TARGET RELATION TYPE
    @OneToMany(() => Item, (item) => item.list, { cascade: ['insert', 'update', 'remove'] })
    items: Item[]
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
}