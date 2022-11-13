import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateFeatureDto, EditFeatureDto } from './dto/feature.dto';
import { FeatureService } from './feature.service';

@ApiBearerAuth()
@ApiTags('Features')
@Controller('features')
export class FeaturesController {
    constructor(
        @Inject(FeatureService) private featureService: FeatureService,
    ) { }

    @ApiOkResponse({ type: [EditFeatureDto] })
    @Get('/all')
    getAllFeatures(
    ): Promise<EditFeatureDto[]> {
        return this.featureService.getAll();
    }

    @ApiOkResponse({ type: EditFeatureDto })
    @Get('/:featureId')
    getFeatureById(
        @Param('featureId') featureId: string
    ): Promise<EditFeatureDto> {
        return this.featureService.getById(featureId)
    }

    @ApiCreatedResponse({ type: EditFeatureDto })
    //@UseGuards(AuthGuard)
    @Post()
    createFeature(@Body() feature: CreateFeatureDto): Promise<EditFeatureDto> {
        return this.featureService.create(feature);
    }

    @ApiOkResponse({ type: EditFeatureDto })
    //@UseGuards(AuthGuard)
    @Put()
    updateFeature(@Body() feature: EditFeatureDto): Promise<EditFeatureDto> {
        return this.featureService.update(feature);
    }

    @ApiOkResponse({ type: Boolean })
    //@UseGuards(AuthGuard)
    @Delete('/:featureId')
    removeFeature(@Param('featureId') featureId: string): Promise<boolean> {
        return this.featureService.remove(featureId);
    }
}
