import { EntityRepository, Repository } from "typeorm";
import { Appointments } from "./appointments.entity";
import { AppointmentsStatus} from "./dto/status.enum";
import { CancelDTO } from './dto/cancel.dto';

/**
 * To connect to database and Apppointments Table and to perform sql queries
 */
@EntityRepository(Appointments)
export class AppointmentsRepository extends Repository<Appointments> {

    // /**
    //  * Status of the order
    //  * @param id 
    //  * @returns 
    //  */
    // async cancelOrder(id: number) {
    //     return await this
    //     .createQueryBuilder()
    //     .update(appointments)
    //     .set({status: AppointmentsStatus.Cancelled})
    //     .where("id = :id", { id })
    //     .execute();
    // }
    async cancelStatus(id: number,data:CancelDTO) {
        console.log(id)
        console.log(data)
        return await this
        .createQueryBuilder()
        .update(Appointments)
        .set({status: AppointmentsStatus.cancelled,reason:data.reason})
        .where("id = :id" , { id })
        .execute();
    }
    
}