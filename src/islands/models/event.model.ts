import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { Optional } from 'sequelize';
import { Island } from './island.model';

interface EventAttributes {
  id: number;
  island_id: number;
  title: string;
  description: string;
  order: number;
}

interface EventCreationAttributes
  extends Optional<EventAttributes, 'id'> {}

@Table({
  tableName: 'events',
  timestamps: false,
})
export class Event extends Model<
  EventAttributes,
  EventCreationAttributes
> {
  @Column({ primaryKey: true, autoIncrement: true })
  id!: number;

  @ForeignKey(() => Island)
  @Column({ allowNull: false })
  island_id!: number;

  @BelongsTo(() => Island)
  island!: Island;

  @Column({ allowNull: false })
  title!: string;

  @Column({ allowNull: false, type: DataType.TEXT })
  description!: string;

  @Column({ allowNull: false })
  order!: number;
}