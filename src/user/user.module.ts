import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'hackethon',
      signOptions: {
        expiresIn: '400s',
      },
    }),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports:[JwtStrategy]
})
export class UserModule {}
