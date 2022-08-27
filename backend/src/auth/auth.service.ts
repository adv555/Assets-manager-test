import { AuthDto } from './dto/auth.dto';
import {
  BadRequestException,
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly mailService: sendMail,
  ) {}

  async authGoogle() {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return {
      user: this.returnUser(user),
      tokens: this.getTokens(user.id, user.email),
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userRepository.findOneBy({ email: dto.email });

    if (oldUser) {
      throw new BadRequestException('Email already exists');
    }
    // const activationLink = uuid.v4();
    const salt = await genSalt(3);
    const newUser = await this.userRepository.create({
      email: dto.email,
      password: await hash(dto.password, salt),
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    // await this.mailService.sendActivationMail(dto.email, activationLink);

    await this.updateRt(newUser.id, tokens.refresh_token);
    const user = await this.userRepository.save(newUser);

    return {
      user,
      tokens,
    };
  }

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
        secret: process.env.JWT_SECRET || 'fintechR',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRt(userId: number, rt: string) {
    const salt = await genSalt(3);
    const rtHash = await hash(rt, salt);
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.refreshTokenHash = rtHash;
    await this.userRepository.save(user);
    return user.refreshTokenHash;
  }

  async returnUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
