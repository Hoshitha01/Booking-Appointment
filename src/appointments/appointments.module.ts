import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsRepository } from './appointments.repository';
import { Appointments } from './appointments.entity';
import { SlotsRepository } from '../slots/slots.repository';
import { UserRepository } from './../user/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Appointments,AppointmentsRepository,SlotsRepository,UserRepository])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService]
})
export class AppointmentsModule {}
