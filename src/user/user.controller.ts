/*import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {}*/

import {
    Body,
    Controller,
    Delete,
    HttpStatus,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { LoginDTO } from './dto/login.dto';
import { LOGIN_FAIL, LOGIN_SUCCESSFULL, REGISTRATION_FAILED, USER_REGISTERED } from '../constant';


/**
 * To make http requests for user and for routing
 */
@ApiBearerAuth('swagger')
@ApiTags('user')
@Controller('user')
export class UserController {

    /**
     * To create instnce using DI
     * @param UserService UserService
     */
    constructor(private userService: UserService) { }

    /**
     * To register the user
     * @param user - UserDTO
     * @returns - Success or failure message
     */
    @ApiCreatedResponse({
        description: USER_REGISTERED,
        status: HttpStatus.CREATED,
    })
    @ApiInternalServerErrorResponse({
        description: REGISTRATION_FAILED,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    @ApiBody({ description: 'UserDTO', required: true, type: UserDTO })
    @Post()
    registerUser(@Body() user: UserDTO): Promise<string> {
        return this.userService.registerTheUser(user);
    }

    /**
     * To login the registered user
     * @param userLogin - LoginDTO
     * @returns -  token
     */
    @ApiOkResponse({
        description: LOGIN_SUCCESSFULL,
        status: HttpStatus.OK,
    })
    @ApiInternalServerErrorResponse({
        description: LOGIN_FAIL,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    @Post('/login')
    userLogin(@Body() userLogin: LoginDTO): Promise<{ token }> {
        return this.userService.loginTheUser(userLogin);
    }
}
