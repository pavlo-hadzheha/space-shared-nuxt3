import { AutoMap } from '@automapper/classes';
import { Schedule, SpaceLocation, Image } from 'src/space/dto/space.dto';
import {
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Category } from './category.model';

@Entity()
export class Space {
  @AutoMap()
  @ObjectIdColumn()
  _id: ObjectID;

  @AutoMap()
  @Column()
  categoryId: string;

  @AutoMap()
  @Column()
  title: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column()
  location: SpaceLocation;

  @AutoMap()
  @Column()
  opened_at: Schedule;

  @AutoMap()
  @Column()
  hourly_rate?: number;

  @AutoMap()
  @Column()
  phone?: string;

  @AutoMap()
  @Column()
  images: Image[];

  @AutoMap()
  @Column()
  features: Array<string>;

  @AutoMap()
  @Column()
  created_by: string;

  @AutoMap()
  @Column()
  approved: boolean;

  @AutoMap()
  @Column()
  approved_by_admin: boolean;
}
