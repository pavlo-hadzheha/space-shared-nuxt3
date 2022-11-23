import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Review {
  @AutoMap()
  @ObjectIdColumn()
  _id: ObjectID;

  @AutoMap()
  @Column()
  userId: string;

  @AutoMap()
  @Column()
  leftOn: string;

  @AutoMap()
  @Column()
  spaceId: string;

  @AutoMap()
  @Column()
  message?: string;

  @AutoMap()
  @Column()
  count: number;
}
