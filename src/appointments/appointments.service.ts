import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { AppointmentsRepository } from './appointments.repository';
import { AppointmentsDTO } from './dto/appointments.dto';
import { APPOINTMENT_BOOKED, FAILED_TO_BOOK, SLOT_NOT_AVAILABLE } from './../constant';
import { SlotsRepository } from './../slots/slots.repository';
import { AppointmentsStatus } from './dto/status.enum';
import { UserRepository } from './../user/user.repository';
import { SlotsStatus } from 'src/slots/slots-status.enum';
import { CancelDTO } from './dto/cancel.dto';


@Injectable()
export class AppointmentsService {

    /**
     *To create instance b DI
     * @param appointmentRepo -  AppointmentsRepository
     */
    constructor(private appointmentRepo: AppointmentsRepository, private slotsRepo: SlotsRepository,
        private userRepository: UserRepository) { }

    logger = new Logger(AppointmentsService.name);
    /**
     *  To book an appointment
     * @param appointment - AppointmentsDTO
     * @returns - Successfull or failure message 
     */
    async bookAnAppointment(appointment: AppointmentsDTO): Promise<string> {
        try {
            /* console.log(appointment)
             let booking: string = appointment.slotsId.status;
             console.log(booking)*/
            let user = await this.userRepository.findOneOrFail(appointment.user)
            appointment.user = user;
            let slot = await this.slotsRepo.findOne(appointment.slots)
            appointment.slots = slot
            const response = await this.appointmentRepo.save(appointment);
            console.log(response)
            if (response) {
                this.logger.log(APPOINTMENT_BOOKED);
                await this.slotsRepo.update(response.slots.id, { status: AppointmentsStatus.booked })
                return APPOINTMENT_BOOKED;
            } else {
                this.logger.error(FAILED_TO_BOOK);
                throw new HttpException(FAILED_TO_BOOK, HttpStatus.BAD_REQUEST);
            }

        }
        catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    /**
     * To cancel the booked appointment
     * @param id - number
     * @param data - CancelDTO
     * @returns - Success or failure message
     */
    async statusUpdate(id: number, data: CancelDTO): Promise<string> {
        try {

            console.log(id,data)
            const result = await this.appointmentRepo.findOneOrFail(id, { relations: ['slots'] })
            const response = await this.appointmentRepo.update(id, { status: AppointmentsStatus.booked, reason: data.reason })


            console.log(response, result)
            if (response) {
                const message = `Appointment cancelled successfully`;
                await this.slotsRepo.update(result.slots.id, { status: AppointmentsStatus.booked })
                this.logger.log(message);
                return message;
            } else {
                throw new InternalServerErrorException(`Appointment is not cancelled`);
            }

        } catch (err) {
            this.logger.error(err.message);
            if (err.status === 404) {
                throw new NotFoundException(err.message);
            }
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * To see all the appointments booked by patient
     * @param userId - number
     * @returns - AppointmentsDTO[]
     */
    async myAppointments(userId: number): Promise<AppointmentsDTO[]> {
        try {
            let user = await this.userRepository.findOne({ where: { id: userId }, relations: ['appointments'] });
            if (user.appointments.length > 0) {
                this.logger.log(`${user.appointments.length} appointments found`);
                return user.appointments;
            } else {
                throw new NotFoundException(`No existing appointments found`);
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    /**
   * Reschedulingg appointment
   * @param appointmentId 
   * @param slotId 
   */
    async rescheduleAppointment(appointmentId: number, slotId: number): Promise<string> {
        try {
            let appointment = await this.appointmentRepo.findOne({ where: { id: appointmentId } });
            // console.log(appointment);
            if (appointment) {
                let oldSlot = await this.slotsRepo.updateSlot(appointment.slots.id, SlotsStatus.Available);
                // console.log(oldSlot);

                let newSlot = await this.slotsRepo.updateSlot(slotId, SlotsStatus.Unavailable);
                // console.log(newSlot);

                let result = this.appointmentRepo.save({ ...appointment, newSlot });
                // console.log(result);


                if (result) {
                    this.logger.log(`Appointment with id ${appointmentId} successfully rescheduled`);
                    return 'Appointment rescheduled successfully';
                }
            } else {
                throw new NotFoundException(`Appointment with id ${appointmentId} not found`);
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }


}
