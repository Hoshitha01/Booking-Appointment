import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctors } from './../doctors/doctors.entity';

/**
 * To create Locations Table
 */
@Entity()
export class Locations{

    /**
    * To create generate id column
    */
    @PrimaryGeneratedColumn()
    id:number;
    
    /**
     * To create locationName column
     */
    @Column()
    locationName:string

    /**
     * 
     */
    @OneToMany(()=>Doctors,(doctors)=>doctors.locations)
    doctors:Doctors

}