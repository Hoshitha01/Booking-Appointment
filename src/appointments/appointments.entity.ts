import { User } from "src/user/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Slots } from './../slots/slots.entity';
import { AppointmentsStatus } from "./dto/status.enum";

@Entity()
export class Appointments {

    /**
     * Id is primary generated column
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * Type of visit
     */
    @Column()
    typeOfVisit: string;

    /**
     * Reason for appointment
     */
    @Column()
    reason: string;

    /**
     * Appointment status
     */
    @Column({type: 'enum', default: AppointmentsStatus.booked, enum: AppointmentsStatus})
     status: AppointmentsStatus;

    /**
     * Forming relation
     */
    @ManyToOne(()=>User, user=> user.appointments, {cascade: ['insert', 'update', 'remove'], onDelete: 'CASCADE' })
    user: User;

    @OneToOne(()=>Slots,(slots)=>slots.appointments,{cascade: ['insert', 'update', 'remove'], onDelete: 'CASCADE' })
    @JoinColumn()
    slots:Slots
}