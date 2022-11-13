import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/currentUserDecorator';
import { AuthGuard } from 'src/guards/AuthGuard';
import { Space } from 'src/models/space.model';
import { User } from 'src/models/user.model';
import { CreateSpaceDto, EditSpaceDto, ViewSpaceDto } from './dto/space.dto';
import { SpaceService } from './space.service';

@ApiBearerAuth()
@ApiTags('Spaces')
@Controller('spaces')
export class SpacesController {
    constructor(
        @Inject(SpaceService) private spaceService: SpaceService,
    ) { }

    @ApiOkResponse({ type: [ViewSpaceDto] })
    @Get('/all')
    getAllSpaces(
    ): Promise<ViewSpaceDto[]> {
        return this.spaceService.getAll();
    }

    @ApiOkResponse({ type: ViewSpaceDto })
    @Get('/:spaceId')
    getSpaceById(
        @Param('spaceId') spaceId: string
    ): Promise<EditSpaceDto> {
        return this.spaceService.getById(spaceId)
    }

    @ApiCreatedResponse({ type: EditSpaceDto })
    @UseGuards(AuthGuard)
    @Post()
    createSpace(
        @CurrentUser() user: User, @Body() space: CreateSpaceDto): Promise<EditSpaceDto> {
        return this.spaceService.create(space, user);
    }

    @ApiOkResponse({ type: EditSpaceDto })
    @UseGuards(AuthGuard)
    @Put()
    updateSpace(@Body() space: EditSpaceDto): Promise<EditSpaceDto> {
        return this.spaceService.update(space);
    }

    @ApiOkResponse({ type: Boolean })
    @UseGuards(AuthGuard)
    @Delete('/:spaceId')
    removeSpace(@Param('spaceId') spaceId: string): Promise<boolean> {
        return this.spaceService.remove(spaceId);
    }
}
