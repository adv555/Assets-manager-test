import { AuthDto } from './dto/auth.dto';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { isHalfWidth } from 'class-validator';
// import { Auth, google } from 'googleapis';
import { v4 } from 'uuid';
import { sendMail } from './servise/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}
  //
  //
  //

  async authGoogle(req: Request) {
    if (!req.user) {
      throw new BadRequestException('No user from google');

      return {
        user: req.user,
      };
    }
  }

  //
  //
  //
  async login(dto: AuthDto, res: Response) {
    const user = await this.validateUser(dto);
    const tokens = await this.getTokens(user.id, user.email);
    this.updateRt(user.id, tokens.refresh_token);
    res.cookie('token', tokens.refresh_token, {
      maxAge: 60 * 60 * 24 * 20,
    });
    // await this.mailerService
    //   .sendMail({
    //     to: dto.email,
    //     from: 'dream.ffindor@gmail.com',
    //     subject: 'Register',
    //     text: '=)',
    //     html: `
    //     <div>
    //     <h1>Hello World =) </h1>
    //     <h1>Click   </h1>
    //     <a href=''>Click Me</a>

    //     </div>
    //   `,
    //   })
    // .catch((e) => {
    //   throw new HttpException(
    //     `Error: ${JSON.stringify(e)}`,
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // });
    return {
      user: this.returnUser(user),
      tokens: tokens,
    };
  }
  //
  //
  //
  async register(dto: AuthDto) {
    const oldUser = await this.userRepository.findOneBy({ email: dto.email });

    if (oldUser) {
      throw new BadRequestException('Email already exists');
    }
    const activationLink = v4();
    const salt = await genSalt(3);
    const newUser = await this.userRepository.create({
      email: dto.email,
      password: await hash(dto.password, salt),
      activationLink: activationLink,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    // await this.mailService.sendActivationMail(dto.email, activationLink);
    await this.mailerService
      .sendMail({
        to: dto.email,
        from: 'dream.ffindor@gmail.com',
        subject: 'Register',
        text: '=)',
        html: `
          <div>
          <h1>Hello World =) </h1>
          <a href='http://localhost:3001/api/auth/${activationLink}'>Click Me</a>

          </div>
        `,
      })
      .catch((e) => {
        throw new HttpException(
          `Error: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });

    this.updateRt(newUser.id, tokens.refresh_token);
    const user = await this.userRepository.save(newUser);

    return {
      user,
      tokens,
    };
  }
  //
  //
  //
  async logout(userId: number, res: Response) {
    const user = await this.userRepository.findOneBy({ id: userId });
    user.refreshTokenHash = '';
    try {
      await this.userRepository.save(user);
    } catch (e) {
      console.log(e);
      return new NotFoundException('Error with logout');
    }
    res.clearCookie('token');
    return { mesage: 'good' };
  }
  //
  //
  //
  async refreshToken(userId: number, rt: string, res: Response) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      return new ForbiddenException('Acces Denied');
    }

    const rtMatches = await compare(rt, user.refreshTokenHash);
    if (!rtMatches) {
      return new ForbiddenException('Acces Denied');
    }

    const tokens = await this.getTokens(user.id, user.email);
    this.updateRt(user.id, tokens.refresh_token);
    res.cookie('token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 20 * 1000,
    });

    return {
      user: this.returnUser(user),
      tokens: tokens,
    };
  }

  //
  //
  //
  async validateUser(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
      select: ['id', 'email', 'password'],
    });
    if (!user) throw new NotFoundException('User not found');

    const isValidPassword = await compare(dto.password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Wrong password');
    }

    return user;
  }
  //
  //
  //
  async getTokens(userId: number, email: string) {
    const data = {
      id: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(data, {
        expiresIn: 60 * 60,
        secret: 'fintech' || process.env.JWT_SECRET,
      }),

      this.jwtService.signAsync(data, {
        expiresIn: 60 * 60 * 24 * 14,
        secret: 'fintechR' || process.env.JWT_REFRESH_SECRET,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  //
  //
  //
  async updateRt(userId: number, rt: string) {
    const salt = await genSalt(3);
    const rtHash = await hash(rt, salt);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.refreshTokenHash = rtHash;
    await this.userRepository.save(user);
    return user.refreshTokenHash;
  }

  //
  //
  //

  async activate(activationLink: string) {
    const user = await this.userRepository.findOneBy({ activationLink });

    if (!user) {
      throw new Error('Link not found');
    }

    user.isVerified = true;

    await this.userRepository.save(user);

    return 'true';
  }

  returnUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
