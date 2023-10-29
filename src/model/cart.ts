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
    quantity: number
}