import {
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { INVALID_CREDENTIALS, LOGIN_SUCCESSFULL, USER_EXISTS, USER_REGISTERED } from '../constant';


/**
 * To make http requests and response
 */
@Injectable()
export class UserService {
    /**
     *To create instance by DI
     * @param userRepo - UserRepository
     * @param jwtService - JwtService
     */
    constructor(
        private userRepo: UserRepository,
        private jwtService: JwtService,
    ) { }
    /**
     *
     */
    logger = new Logger(UserService.name);

    /**
     * To register the user
     * @param user - UserDTO
     * @returns - successful or failure message
     */
    async registerTheUser(user: UserDTO): Promise<string> {
        try {
            const { password } = user;
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const response = await this.userRepo.save({
                ...user,
                password: hashedPassword,
            });
            if (response) {
                this.logger.log(USER_REGISTERED);
                return USER_REGISTERED;
            } else {
                throw new InternalServerErrorException(USER_EXISTS);
            }
        } catch (err) {
            this.logger.error(err.message);
            if (err.errno === 1062) {
                throw new ConflictException(USER_EXISTS);
            }
            throw new HttpException(USER_EXISTS, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    /**
     * To login the registered user
     * @param userLogin - LoginDTO
     * @returns - token
     */
    async loginTheUser(userLogin: LoginDTO): Promise<{ token }> {
        try {
            const userInfo = await this.userRepo.findOneOrFail({
                emailId: userLogin.emailId,
            });
            if (
                userInfo &&
                (await bcrypt.compare(userLogin.password, userInfo.password))
            ) {
                const payload: JwtPayload = { emailId: userInfo.emailId };
                const token = this.jwtService.sign(payload);
                this.logger.log(LOGIN_SUCCESSFULL);
                return { token };
            } else {
                throw new UnauthorizedException(INVALID_CREDENTIALS);
            }
        } catch (error) {
            this.logger.error(error.message);
            if (error?.status === 401) {
                throw new UnauthorizedException(INVALID_CREDENTIALS);
            }
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
