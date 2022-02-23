import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { validate } from 'class-validator';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './../user.repository';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepo: UserRepository) {
    super({
      secretOrKey: 'petpeer',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  //
  async validate(payload: JwtPayload) {
    try {
      const response = this.userRepo.findOneOrFail({
        emailId: payload.emailId,
      });
      return response;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
