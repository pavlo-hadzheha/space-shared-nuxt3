import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @AutoMap()
  @ApiProperty()
  message?: string;

  @AutoMap()
  @ApiProperty()
  count: number;
}

export class ViewReviewDto extends CreateReviewDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  spaceId: string;

  @AutoMap()
  @ApiProperty()
  userId: string;

  @AutoMap()
  @ApiProperty()
  userFirstName: string;

  @AutoMap()
  @ApiProperty()
  userLastName: string;

  @AutoMap()
  @ApiProperty()
  leftOn: string;
}
