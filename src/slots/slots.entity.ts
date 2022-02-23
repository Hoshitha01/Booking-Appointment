import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Appointments } from 'src/appointments/appointments.entity';
import { Doctors } from './../doctors/doctors.entity';


/**
 * To create slots table in database
 */
@Entity()
export class Slots{
    
    /**
     * To create Id column
     */
    @PrimaryGeneratedColumn()
    id:number

    /**
     * To create Id column
     */
    @Column()
    date:string

    /**
     * To create startTime column
     */
    @Column()
    startTime:string

    /**
     * To create endTime column
     */
    @Column()
    endTime:string

    /**
     * To create status column
     */
    @Column()
    status :string;

    @OneToOne(()=>Appointments,(appointments)=>appointments.slots)
    appointments:Appointments

    @ManyToOne(()=>Doctors,(doctors)=>doctors.slots)
    doctors:Doctors
}
