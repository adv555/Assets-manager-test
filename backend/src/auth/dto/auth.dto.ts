import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'The password must be longer than 6 characters' })
  @IsString()
  password: string;
}
