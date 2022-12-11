import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @AutoMap()
  @ApiProperty()
  label: string;
}

export class EditCategoryDto extends CreateCategoryDto {
  @AutoMap()
  @ApiProperty()
  id: string;
}
