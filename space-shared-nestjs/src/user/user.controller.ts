import { Controller, Get, Inject, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/currentUserDecorator';
import { AuthGuard } from 'src/guards/AuthGuard';
import { User } from 'src/models/user.model';
import { UserResponse } from '../auth/dto/user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        @Inject(UserService) private userService: UserService,
    ) {}

    @ApiCreatedResponse({ type: [UserResponse] })
    @Get('/all')
    async getAllUsers(
    ): Promise<UserResponse[]> {
        return this.userService.getAll();
    }

    @ApiCreatedResponse({ type: UserResponse })
    @UseGuards(AuthGuard)
    @Get('/me')
    async getUserInfo(
        @CurrentUser() user: User,
    ): Promise<UserResponse> {
        return user;
    }

    @ApiCreatedResponse({ type: UserResponse })
    @Get('/{userId}')
    getUserById(
        @Param('userId') userId: string
    ): Promise<UserResponse> {
        return this.userService.getById(userId)
    }
}
