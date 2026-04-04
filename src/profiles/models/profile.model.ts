import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, Unique, AllowNull } from 'sequelize-typescript';

@Table({ tableName: 'Profiles' })
export class Profile extends Model {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) id: number

  @Unique @AllowNull(false) @Column(DataType.STRING) name: string

  @AllowNull(true) @Column(DataType.STRING) description: string
}
