
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UserResponse } from './dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private authService: AuthService,
    ){}

    @ApiCreatedResponse({ type: String })
    @Post('/login')
    login(
        @Body() user: LoginDto
    ): Promise<string> {
        return this.authService.login(user)
    }

    @ApiCreatedResponse({ type: String })
    @Post('/register')
    register(
        @Body() user: RegisterDto
    ): Promise<string> {
        return this.authService.create(user)
    }
}
