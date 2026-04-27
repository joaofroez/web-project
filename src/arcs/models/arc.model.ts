import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Optional } from 'sequelize';
import { Saga } from '../../sagas/models/saga.model';
import { Island } from '../../islands/models/island.model';
import { HasMany } from 'sequelize-typescript';

interface ArcAttributes {
  id: number;
  name: string;
  description: string;
  saga_id: number;
  order: number;
}

interface ArcCreationAttributes
  extends Optional<ArcAttributes, 'id'> {}

@Table({
  tableName: 'arcs',
  timestamps: true,
  paranoid: true,
})
export class Arc extends Model<ArcAttributes, ArcCreationAttributes> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @ForeignKey(() => Saga)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  saga_id!: number;

  @BelongsTo(() => Saga)
  saga!: Saga;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  order!: number;

  @HasMany(() => Island)
  islands!: Island[];
}