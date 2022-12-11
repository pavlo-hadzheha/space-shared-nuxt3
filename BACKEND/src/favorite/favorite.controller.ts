import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/currentUserDecorator';
import { AuthGuard } from 'src/guards/AuthGuard';
import { User } from 'src/models/user.model';
import { ViewSpaceDto } from 'src/space/dto/space.dto';
import { FavoriteService } from './favorite.service';

@ApiBearerAuth()
@ApiTags('Favorites')
@Controller('favorites')
export class FavoritesController {
    constructor(
        @Inject(FavoriteService) private favoriteService: FavoriteService,
    ) { }

    @ApiOkResponse({ type: [ViewSpaceDto] })
    @UseGuards(AuthGuard)
    @Get('/me/all')
    getAllFavorites(@CurrentUser() user: User): Promise<ViewSpaceDto[]> {
        return this.favoriteService.getAll(user.id.toString());
    }

    @ApiOkResponse({ type: Boolean })
    @UseGuards(AuthGuard)
    @Get('/me/:spaceId/check')
    checkFavoriteBySpaceId(@CurrentUser() user: User, @Param('spaceId') spaceId: string): Promise<boolean> {
        return this.favoriteService.check(user.id.toString(), spaceId);
    }

    @ApiCreatedResponse({ type: Boolean })
    @UseGuards(AuthGuard)
    @Post('/me/:spaceId')
    createFavorite(@CurrentUser() user: User, @Param('spaceId') spaceId: string): Promise<boolean> {
        return this.favoriteService.create(user.id.toString(), spaceId);
    }

    @ApiOkResponse({ type: Boolean })
    @UseGuards(AuthGuard)
    @Delete('/me/:spaceId')
    removeFavorite(@CurrentUser() user: User, @Param('spaceId') spaceId: string): Promise<boolean> {
        return this.favoriteService.remove(user.id.toString(), spaceId);
    }

    @ApiOkResponse({ type: [ViewSpaceDto] })
    @UseGuards(AuthGuard)
    @Get('/:userId/all')
    getAllFavoritesByUserId(@Param('userId') userId: string): Promise<ViewSpaceDto[]> {
        return this.favoriteService.getAll(userId);
    }
}
