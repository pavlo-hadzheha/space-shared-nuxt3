import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Favorite {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    userId: string;

    @Column()
    spaceId: string;
}
