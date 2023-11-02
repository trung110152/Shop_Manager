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
    inventory: number // so luong con lai trong kho
    @Column({default: 1})
    categoryId: number
    @Column()
    image: string
}