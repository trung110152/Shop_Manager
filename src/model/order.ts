import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    idUser: number
    @Column()
    receiver: string
    @Column()
    address: string
    @Column()
    phone: number
    @Column({type: "timestamp"})
    time: string
    @Column()
    totalPoint: number
    @Column()
    status: string
}