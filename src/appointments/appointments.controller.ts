import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { APPOINTMENTS_FETCHED, APPOINTMENT_IS_SCHEDULE, FAILED_TO_FETCH, FAILED_TO_SCHEDULE_APPOINMENT } from 'src/constant';
import { AppointmentsService } from './appointments.service';
import { AppointmentsDTO } from './dto/appointments.dto';
import { StatusDTO } from './dto/status.dto';
import { CancelDTO } from './dto/cancel.dto';

/**
 * To make http requests and for routing
 */
@ApiTags('appointments')
@Controller('appointments')
export class AppointmentsController {

    /**
     * To create instance by DI
     * @param appointmentService - AppointmentsService
     */
    constructor(private appointmentService: AppointmentsService) { }
    /**
     * To book a doctor appointment 
     * @param appointment
     * @returns Successfull or failure message
     */
    @ApiCreatedResponse({
        description: ' ',
        status: HttpStatus.CREATED,
    })
    @ApiInternalServerErrorResponse({
        description: '',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    @Post()
    bookAppointment(@Body() appointment: AppointmentsDTO): Promise<string> {
        return this.appointmentService.bookAnAppointment(appointment);
    }

    /**
     * 
     * @param id 
     * @param statusDTO 
     * @returns 
     */
    @ApiOkResponse({ description: 'Appointment cancelled successfully', status: HttpStatus.OK })
    @ApiInternalServerErrorResponse({
        description: 'Appointment cancelled successfully',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    @Patch(':id')
    statusUpdate(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: CancelDTO
    ): Promise<string> {
        console.log(data)
        return this.appointmentService.statusUpdate(id, data);
    }

    /**
* My appointments
* @param name Search item by item name
* @returns 
*/
    @ApiOkResponse({
        description: APPOINTMENTS_FETCHED,
        status: HttpStatus.OK
    })
    @ApiInternalServerErrorResponse({
        description: FAILED_TO_FETCH,
        status: HttpStatus.INTERNAL_SERVER_ERROR
    })
    @Get('/:userId')
    myAppointments(@Param('userId', ParseIntPipe) userId: number): Promise<AppointmentsDTO[]> {
        return this.appointmentService.myAppointments(userId);
    }

    /**
 * Appointment schedule
 * @param appointmentId 
 * @param slotId 
 */
    @ApiOkResponse({ description: APPOINTMENT_IS_SCHEDULE, status: HttpStatus.OK, })
    @ApiInternalServerErrorResponse({ description: FAILED_TO_SCHEDULE_APPOINMENT, status: HttpStatus.INTERNAL_SERVER_ERROR, })
    @Patch('/appointments/:appointmentId/reschedule/slots/:slotId')
    rescheduleAppointment(@Param('appointmentId', ParseIntPipe) appointmentId: number, @Param('slotId', ParseIntPipe) slotId: number): Promise<String> {
        return this.appointmentService.rescheduleAppointment(appointmentId, slotId);
    }
}
