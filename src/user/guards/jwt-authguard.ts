import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 * To do authentication
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
