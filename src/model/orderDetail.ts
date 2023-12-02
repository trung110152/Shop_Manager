import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { Product } from "./product";

@Entity()
export class OrderDetail{
    @PrimaryGeneratedColumn()
    orderDetailId: number
    @Column()
    orderId: number
    @Column()
    productId: number
    @Column()
    productName: string
    @Column()
    price: number
    @Column()
    description: string
    @Column()
    inventory: number
    @Column()
    categoryId: number
    @Column()
    image: string
    @Column()
    quantity: number
}