import { UserToken } from './userToken';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity('User')
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public email: string;

    @Column({ name: 'first_name' })
    public firstName: string;

    @Column({ name: 'last_name' })
    public lastName: string;

    @Column()
    public gender: string;

    @Column()
    public picture: string;

    @Column()
    public facebookId: number;

    @OneToMany(type => UserToken, type => User)
    @JoinColumn({ referencedColumnName: '' })
    public userToken: UserToken[];

}