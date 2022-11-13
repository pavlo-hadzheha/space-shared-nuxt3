import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    path: string;
}

export class EditCategoryDto extends CreateCategoryDto {
    @AutoMap()
    @ApiProperty()
    id: string;
}