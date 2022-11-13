import { AutoMap } from '@automapper/classes';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Category {
    @AutoMap()
    @ObjectIdColumn()
    _id: ObjectID;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column()
    path: string;
}