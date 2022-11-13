import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeatureDto {
    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    path: string;
}

export class EditFeatureDto extends CreateFeatureDto {
    @AutoMap()
    @ApiProperty()
    id: string;
}