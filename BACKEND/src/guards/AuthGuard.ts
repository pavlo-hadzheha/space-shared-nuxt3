import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) throw new UnauthorizedException('Token not found with request');

    try {
      const tokenToDecode = token.split(' ')[1];

      const decode = this.authService.decodeToken(tokenToDecode);

      const user = await this.userService.getById(decode['id']);
      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Unauthorized token');
    }
  }
}
