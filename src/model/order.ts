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
    @Column({type: 'datetime', default: () => 'current_timestamp'})
    orderDate: Date
    @Column()
    totalAmount: number // tong so tin don hang
    @Column({default: 'loading'})
    status: string
}