import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    productId: number
    @Column()
    productName: string
    @Column()
    price: number
    @Column()
    description: string
    @Column()
    stockQuantity: number // so luong con lai trong kho
    @Column()
    categoryId: number
    @Column()
    image: string
}