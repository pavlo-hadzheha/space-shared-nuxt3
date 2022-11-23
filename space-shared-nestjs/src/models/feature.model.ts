import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Feature {
  @AutoMap()
  @ObjectIdColumn()
  _id: ObjectID;

  @AutoMap()
  @Column()
  label: string;

  // @AutoMap()
  // @Column()
  // path: string;
}
