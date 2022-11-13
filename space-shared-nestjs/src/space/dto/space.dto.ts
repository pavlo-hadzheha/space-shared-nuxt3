import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EditCategoryDto } from 'src/category/dto/category.dto';

export class MapView {
    @ApiProperty()
    TopLeft: any;

    @ApiProperty()
    BottomRight: any;
}
export class SpaceLocation {
    @ApiProperty()
    lon: string;

    @ApiProperty()
    lat: string;

    @ApiProperty()
    mapView: MapView;

    @ApiProperty()
    country: string;

    @ApiProperty()
    countryCode: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    street: string;

    @ApiProperty()
    house: string;

    @ApiProperty()
    label: string;
}


export class DayTimeSpan {
    @ApiProperty()
    available: boolean;

    @ApiProperty()
    from: string;

    @ApiProperty()
    to: string;
}

export class Schedule {
    @ApiProperty()
    sunday: DayTimeSpan;

    @ApiProperty()
    monday: DayTimeSpan;

    @ApiProperty()
    tuesday: DayTimeSpan;

    @ApiProperty()
    wednesday: DayTimeSpan;

    @ApiProperty()
    thursday: DayTimeSpan;

    @ApiProperty()
    friday: DayTimeSpan;

    @ApiProperty()
    saturday: DayTimeSpan;
}

export class CreateSpaceDto {
    @AutoMap()
    @ApiProperty()
    categoryId: string;

    @AutoMap()
    @ApiProperty()
    title: string;

    @AutoMap()
    @ApiProperty()
    description: string;

    @AutoMap()
    @ApiProperty()
    location: SpaceLocation;

    @AutoMap()
    @ApiProperty()
    opened_at: Schedule;

    @AutoMap()
    @ApiPropertyOptional()
    hourly_rate?: number;

    @AutoMap()
    @ApiProperty()
    phone?: string;

    @AutoMap()
    @ApiProperty({
        type: [String],
    })
    images: Array<string>;

    @AutoMap()
    @ApiProperty({
        type: [String],
    })
    features: Array<string>;
}

export class EditSpaceDto extends CreateSpaceDto {
    @AutoMap()
    @ApiProperty()
    id: string;

    @AutoMap()
    @ApiProperty()
    created_by: string;

    @AutoMap()
    @ApiProperty()
    approved: boolean;

    @AutoMap()
    @ApiProperty()
    approved_by_admin: boolean;
}

export class ViewSpaceDto extends EditSpaceDto {
    // @ApiProperty()
    // reviews: number[];

    // @ApiProperty()
    // books: number[];
}