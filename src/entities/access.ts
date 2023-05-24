import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Access extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid!: string;

    @Column({ type: "varchar", length: 1024, default: "" })
    username: string = "";

    @Column('datetime', { default: null })
    startedAt: Date | null = null;

    @Column('datetime', { default: null })
    finishedAt: Date | null = null;

    @Column('bool', {default: false})
    isClosed: boolean = false;
}