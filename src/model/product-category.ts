import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    idProduct: number
    @Column()
    idCategory: number
}