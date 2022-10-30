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
    async getAllSpaces(
    ): Promise<ViewSpaceDto[]> {
        const spaces = await this.spaceService.getAll();

        return spaces.map(space => space);
    }

    @ApiOkResponse({ type: ViewSpaceDto })
    @Get('/:spaceId')
    getSpaceById(
        @Param('spaceId') spaceId: string
    ): Promise<ViewSpaceDto> {
        return this.spaceService.getById(spaceId)
    }

    @ApiCreatedResponse({ type: EditSpaceDto })
    @UseGuards(AuthGuard)
    @Post()
    createSpace(
        @CurrentUser() user: User, @Body() space: CreateSpaceDto): Promise<EditSpaceDto> {

        return this.spaceService.create({ ...space, 
            approved: false, 
            approved_by_admin: false, 
            created_by: user.id, 
        });
    }

    @ApiOkResponse({ type: EditSpaceDto })
    @UseGuards(AuthGuard)
    @Put()
    async updateSpace(@Body() space: EditSpaceDto): Promise<Space> {
        return await this.spaceService.update(space);
    }

    @ApiOkResponse({ type: Boolean })
    @UseGuards(AuthGuard)
    @Delete('/:spaceId')
    async removeSpace(@Param('spaceId') spaceId: string): Promise<boolean> {
        return await this.spaceService.remove(spaceId);
    }
}
