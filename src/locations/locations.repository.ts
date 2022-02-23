import { EntityRepository, Repository } from 'typeorm';
import { Locations } from './locations.entity';

@EntityRepository(Locations)
export class UserRepository extends Repository<Locations> {}