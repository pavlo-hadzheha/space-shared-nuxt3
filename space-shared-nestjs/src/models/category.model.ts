import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Category {
    @ObjectIdColumn({ name: '_id' })
    id?: string;

    @Column()
    public name: string;

    @Column()
    public path: string;
}
