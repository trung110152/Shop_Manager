import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    orderId: number
    @Column()
    userId: number
    @Column()
    receiver: string
    @Column()
    address: string
    @Column()
    phone: number
    @Column({type: "timestamp"})
    orderDate: string
    @Column()
    totalAmount: number // tong so tin don hang
    @Column()
    status: string
}