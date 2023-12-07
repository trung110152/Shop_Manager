import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
interface Reply {
    userId: number;
    userName: string;
    comment: string;
    date: Date
  }
@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    reviewId: number
    @Column()
    userId: number
    @Column()
    productId: number
    @Column({type: 'datetime', default: () => 'current_timestamp'})
    reviewDate: Date
    @Column({default: 0})
    rating: number // diem danh gia(tu 1 den 5)
    @Column()
    comment: string
    @Column("simple-json")
    reply: Reply;
   
}