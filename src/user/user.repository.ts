import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
/**
 * To connect to database and User Table and to perform sql quiries
 */
@EntityRepository(User)
export class UserRepository extends Repository<User> {}

