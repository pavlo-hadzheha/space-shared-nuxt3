import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

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
