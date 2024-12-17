import { Table, Column, Model, DataType, Unique, AllowNull } from 'sequelize-typescript';

export interface IAstronaut {
    id?: number;
    name?: string;
    email?: string;
    createdAt?: Date;
    updateAt?: Date;
}

@Table({ tableName: 'astronauts', timestamps: true })
export class AstronautModel extends Model<IAstronaut> {
    @AllowNull(false)
    @Column(DataType.STRING)
    name!: string;

    @Unique
    @AllowNull(false)
    @Column(DataType.STRING)
    email!: string;

    // not need to declare createdAt and updatedAt if `timestamps: true` is activated
}