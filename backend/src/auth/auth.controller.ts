import { Tokens } from './types/tokens.type';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { threadId } from 'worker_threads';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from 'src/user/user.entity';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import { isPositive } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}
  //
  //
  //
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return this.authService.authGoogle(req);
  }

  //
  //
  //

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() dto: AuthDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(req.cookies);
    return this.authService.login(dto, res);
  }

  //
  //
  //
  @ApiOperation({ summary: 'Create new User' })
  @ApiResponse({ status: 201, type: UserEntity })
  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }
  //
  //
  //
  @Get(':link')
  @Redirect('http://localhost:3000')
  async activatedLink(@Param('link') link: string) {
    console.log(link);
    return this.authService.activate(link);
  }
  //
  //
  //
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user['id'];
    console.log(user);
    return this.authService.logout(user, res);
  }
  //

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(200)
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('1');
    const { toket, token } = req.cookies;
    console.log(req.cookies);
    console.log(token);
    console.log('2');

    // const id = req.user['id'];
    // const tokens = req.user['refreshToken'];

    return this.authService.refreshToken(1, token, res);
  }
}
