import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Space {
    @ObjectIdColumn({ name: '_id' })
    id?: string;

    @Column()
    public created_by: string;

    @Column()
    public category: string;

    @Column()
    public title: string;

    @Column()
    public description: string;

    @Column()
    public hourly_rate?: number;

    @Column()
    public phone?: string;

    @Column()
    public images: Array<string>;

    @Column()
    public features: Array<number>;

    @Column()
    public approved: boolean;

    @Column()
    public approved_by_admin: boolean;
}
