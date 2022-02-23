import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Locations } from './../locations/locations.entity';
import { User } from './../user/user.entity';
import { Slots } from './../slots/slots.entity';

/**
 * To create Doctors table in database
 */
@Entity()
export class Doctors {

    /**
     * To generate Id column
     */
    @PrimaryGeneratedColumn()
    id:number

    /**
     * To create doctorName column
     */
    @Column()
    doctorName: string

    /**
     * To create password column
     */
    @Column()
    password: string

    /**
     * To create specialization column
     */
    @Column()
    specialization: string

    /**
     * To create consultaionFee column
     */
    @Column()
    consultaionFee: number

    /**
     * To create experience column
     */
    @Column()
    experience: number

    /**
     * To create rating column
     */
    @Column()
    rating: number

    /**
     * To create qualification column
     */
    @Column()
    qualification: string

    //@ManyToOne(()=>Locations)

    /**
     * Relation between locations and doctors
     */
    @ManyToOne(() => Locations, (locations) => locations.doctors)
    locations:Locations;

    @OneToOne(()=>User,(user)=>user.doctors)
    @JoinColumn()
    user:User

    @OneToMany(()=>Slots,(slots)=>slots.doctors)
    slots:Slots[]

}