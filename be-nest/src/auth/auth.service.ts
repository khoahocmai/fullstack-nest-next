import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/helpers/util';
import { JwtService } from '@nestjs/jwt';
import {
  ChangePasswordAuthDto,
  CodeAuthDto,
  CreateAuthDto,
} from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) return null;

    const isValidPassword = await comparePasswordHelper(
      password,
      user?.password || 'nothing',
    );
    if (!isValidPassword) return null;

    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      user: {
        email: user.email,
        name: user.name,
        _id: user._id,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: CreateAuthDto) {
    return await this.usersService.handleRegister(registerDto);
  }

  async checkCode(data: CodeAuthDto) {
    return await this.usersService.handleActive(data);
  }

  async retryActive(email: string) {
    return await this.usersService.retryActive(email);
  }

  async retryPassword(email: string) {
    return await this.usersService.retryPassword(email);
  }
  async changePassword(data: ChangePasswordAuthDto) {
    return await this.usersService.changePassword(data);
  }
}
