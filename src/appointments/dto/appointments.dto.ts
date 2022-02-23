import { IsNotEmpty } from "class-validator";
import { Slots } from "src/slots/slots.entity";
import { User } from "src/user/user.entity";
import { AppointmentsStatus } from "./status.enum";

export class AppointmentsDTO {

    /**
     * Id is auto generated
     */
    id: number;

    /**
     * Type of visit whether it is online or offline
     */
    @IsNotEmpty()
    typeOfVisit: string;

    /**
     * Reason for appointment
     */
    @IsNotEmpty()
    reason: string;

    status: AppointmentsStatus;

    @IsNotEmpty()
    slots:Slots;

    @IsNotEmpty()
    user:User;
}