import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('photos')
export class Photo {
  @ObjectIdColumn()
  id: ObjectID;

  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @Column()
  public description: string;

  @ApiProperty()
  @Column()
  public filename: string;

  @ApiProperty()
  @Column()
  public isPublished: boolean;
}
