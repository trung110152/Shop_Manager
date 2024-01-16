import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class OTP{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    otp: string
}