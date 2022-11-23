import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { UserService } from 'src/user/user.service';
import { sign, verify } from 'jsonwebtoken';
import { ObjectID } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private userService: UserService) {}

  async login(data: LoginDto): Promise<string> {
    if (!data.email || !data.password)
      throw new BadRequestException('Fill required data');

    const user = await this.userService.getByEmail(data.email);

    if (!user) throw new UnauthorizedException('User does not exist');

    if (!(await bcrypt.compare(data.password, user.passwordHash)))
      throw new UnauthorizedException('Incorrect password');

    return this.createToken(user.id, user.email, false);
  }

  async create(data: RegisterDto): Promise<string> {
    if (!data.email || !data.password)
      throw new BadRequestException('Fill required data');

    const hashPassword = await bcrypt.hash(data.password, 10);

    const checkUserExist = await this.userService.getByEmail(data.email);

    if (checkUserExist)
      throw new UnauthorizedException('This email is already in use');

    const newUser = await this.userService.create({
      email: data.email,
      passwordHash: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      rule: data.rule,
    });

    return this.createToken(newUser.id, newUser.email, false);
  }

  createToken(userId: string, email: string, isAdmin: boolean): string {
    return sign(
      {
        id: userId,
        email: email,
        isAdmin: isAdmin,
      },
      'my_secret',
      { expiresIn: '1y' },
    );
  }

  decodeToken(token: string) {
    const decode = verify(token, 'my_secret');
    return decode;
  }
}
