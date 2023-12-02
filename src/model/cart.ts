import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    cartId: number
    @Column()
    userId: number
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