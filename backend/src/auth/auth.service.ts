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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return {
      user: this.returnUser(user),
      accessToken: await this.getAccessToken(user.id),
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userRepository.findOneBy({ email: dto.email });

    if (oldUser) {
      throw new BadRequestException('Email already exists');
    }

    const salt = await genSalt(3);
    const newUser = await this.userRepository.create({
      email: dto.email,
      password: await hash(dto.password, salt),
    });

    const user = await this.userRepository.save(newUser);

    return {
      user: user,
      accesssToken: await this.getAccessToken(user.id),
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

  async getAccessToken(userId: number) {
    const data = {
      id: userId,
    };
    return await this.jwtService.signAsync(data, {
      expiresIn: '20d',
    });
  }

  async returnUser(user: UserEntity) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
