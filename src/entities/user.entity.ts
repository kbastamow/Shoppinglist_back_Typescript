import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { List } from "./list.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string
    @Column({
        type: 'varchar',
        length: 45
    })
    username: string
    @Column({ type: 'varchar', length: 45, unique: true })
    email: string
    @Column({
        type: 'varchar',
        length: 255
    })
    password: string
    @Column({
        type: 'varchar',
        length: 255,
        nullable: true,
    })
    token?: string
    @Column({ type: 'boolean', default: false })
    confirmed: boolean
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
    @OneToMany(() => List, (list) => list.user, { onDelete: 'CASCADE' })
    lists: List[]

}
