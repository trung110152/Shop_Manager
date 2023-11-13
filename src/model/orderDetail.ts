import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class OrderDetail{
    @PrimaryGeneratedColumn()
    orderDetailId: number
    @Column()
    quantity: number
    @Column()
    productId: number
    @Column()
    price: number
    @Column()
    orderId: number
}