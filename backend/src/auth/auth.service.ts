import { AuthDto } from './dto/auth.dto';
import {
  BadRequestException,
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
import uuid from 'uuid';
import { sendMail } from './servise/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async authGoogle() {}

  //
  //
  //
  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRt(user.id, tokens.refresh_token);
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
    const activationLink = uuid.v4();
    const salt = await genSalt(3);
    const newUser = await this.userRepository.create({
      email: dto.email,
      password: await hash(dto.password, salt),
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    // await this.mailService.sendActivationMail(dto.email, activationLink);
    await this.mailerService
      .sendMail({
        from: process.env.SMTP_USER || 'fitechmate@gmail.com',
        to: dto.email,
        subject: 'Register',
        text: '=)',
        html: `
          <div>
          <h1>Hello World =) </h1>
          <h1>Click  ${activationLink} </h1>
          <a href='${activationLink}'>Click Me</a>

          </div>
        `,
        template: join(__dirname, '/../templates', 'confirmReg'),
        context: {
          username: dto.email,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Error: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });

    await this.updateRt(newUser.id, tokens.refresh_token);
    const user = await this.userRepository.save(newUser);

    return {
      user,
      tokens,
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
        secret: process.env.JWT_SECRET || 'fintech',
      }),

      this.jwtService.signAsync(data, {
        expiresIn: 60 * 60 * 24 * 14,
        secret: process.env.JWT_REFRESH_SECRET || 'fintechR',
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

  returnUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
