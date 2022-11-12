import { Column, Entity, ObjectIdColumn } from "typeorm"

export enum Rule {
    USER = 1,
    HOST = 2,
    ADMIN = 3
  }

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
    
    @Column()
    public company?: string

    @Column()
    public phone?: string

    @Column({
        type: 'enum',
        enum: Rule,
        default: Rule.USER
      })
    public rule: Rule
}
