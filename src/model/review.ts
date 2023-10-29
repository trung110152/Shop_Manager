import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number
    @Column()
    userId: number
    @Column()
    productId: number
    @Column()
    rating: number // diem danh gia(tu 1 den 5)
    @Column()
    comment: string
}