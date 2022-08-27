import { UserEntity } from 'src/user/user.entity';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAtStrategy } from './strategies/jwtAt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getJwtConfig } from 'src/config/jwt.config';
import { sendMail } from './servise/mail.service';
import { JwtRtStrategy } from './strategies/jwtRt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAtStrategy, JwtRtStrategy, sendMail],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class AuthModule {}
