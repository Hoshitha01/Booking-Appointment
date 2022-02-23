import { IsNotEmpty } from 'class-validator';
import { Appointments } from '../appointments.entity';


export class StatusDTO {
  @IsNotEmpty({ message: 'Appointment should not be empty' })
  appointment:Appointments;

  @IsNotEmpty()
  reason:string
}
