import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string
    @Column()
    price: number
    @Column()
    description: string
    @Column()
    totalQuantity: number
    @Column()
    image: string
}