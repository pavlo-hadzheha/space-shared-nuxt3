import { Column, Entity, PrimaryColumn, ObjectIdColumn } from "typeorm"

@Entity()
export class User {
    @ObjectIdColumn({ name: '_id' })
    id?: string

    @Column()
    public email: string

    @Column()
    public passwordHash: string

    @Column()
    public firstName: string

    @Column()
    public lastName: string
}
