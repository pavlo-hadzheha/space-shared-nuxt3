import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSpaceDto {
    @ApiProperty()
    category: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiPropertyOptional()
    hourly_rate?: number;

    @ApiProperty()
    phone?: string;

    @ApiProperty({
        type: [String],
    })
    images: Array<string>;

    @ApiProperty({
        type: [Number],
    })
    features: Array<number>;
}

export class EditSpaceDto extends CreateSpaceDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    created_by: string;

    @ApiProperty()
    approved: boolean;

    @ApiProperty()
    approved_by_admin: boolean;
}

export class ViewSpaceDto extends EditSpaceDto {

    // @ApiProperty()
    // reviews: number[];

    // @ApiProperty()
    // books: number[];
}