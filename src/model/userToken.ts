import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('UserToken')
export class UserToken {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: number;

    @Column()
    public token: string;

    @Column({ type: Date })
    public createdAt: string;

}