import { Appointments } from "src/appointments/appointments.entity";
import { Doctors } from "src/doctors/doctors.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

/*name
gender
age
emailId
password
phoneNumber
SSNNumber
role
*/


/**
 * To create user table in database
 */
@Entity()
@Unique(['emailId'])
export class User {

    /**
     * To generate id column
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     *  To generate userName column
     */
    @Column()
    name: string;

    /**
     *  To generate emailId column
     */
    @Column()
    emailId: string;

    /**
     *  To generate password column
     */
    @Column()
    password: string;

    /**
     *  To generate id phonenumber column
     */
    @Column()
    phoneNumber: string;

    /**
    * To generate id phonenumber column
    */
    @Column()
    age:number

    /**
    * To generate id phonenumber column
    */
    @Column()
    SSNNumber:string

    /*
    @Column({ type: 'enum', enum: Role, default: Role.User })
    role: Role;*/

    @OneToOne(()=>Doctors,(doctor)=>doctor.user)
    doctors:Doctors;

    @OneToMany(()=>Appointments,(appointments)=>appointments.user)
    appointments:Appointments[];

   
}


/**
 *     @OneToOne(()=>User,(user)=>user.)
    @JoinColumn()
    user:User
 * 
 */