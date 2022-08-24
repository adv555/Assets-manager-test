import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';

@Module({
  controllers: [UserController],
  providers: [UserService, userProvider],
  exports: [UserService],
})
export class UserModule {}
