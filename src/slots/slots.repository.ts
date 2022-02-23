import { EntityRepository, Repository } from "typeorm";
import { SlotsStatus } from "./slots-status.enum";
import { Slots } from './slots.entity';

/**
 * To connect to database and User Table and to perform sql quiries
 */
 @EntityRepository(Slots)
 export class SlotsRepository extends Repository<Slots> {
     /**

     * Slotsstatus

     * @param id 

     * @param status 

     */

    async updateSlot(id: number, status: SlotsStatus) {

        return await this.createQueryBuilder()

        .update(Slots)

        .set({status: status})

        .where("id = :id", { id })

        .execute();

    }
 }