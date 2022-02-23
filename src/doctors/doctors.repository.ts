import { EntityRepository, Repository } from "typeorm";
import { Doctors } from './doctors.entity';

/**
 * To connect to Doctors table in database and to perform logics
 */
@EntityRepository(Doctors)
export class UserRepository extends Repository<Doctors> {}