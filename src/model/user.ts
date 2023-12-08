import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number
    @Column()
    userName: string
    @Column("date")
    birthDay: Date
    @Column()
    email: string
    @Column()
    phone: string
    @Column()
    address: string
    @Column()
    password: string
    @Column({default: 2}) // 1: admin, 2: user
    role: number

}