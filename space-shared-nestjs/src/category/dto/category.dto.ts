import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    path: string;
}

export class EditCategoryDto extends CreateCategoryDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    path: string;
}