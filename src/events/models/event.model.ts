import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Island } from '../../islands/models/island.model';
import { CharacterVersion } from '../../character-versions/models/character-version.model';
import { EventParticipant } from './event-participant.model';

@Table({ tableName: 'events', timestamps: true, paranoid: true })
export class Event extends Model {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) id!: number;

  @ForeignKey(() => Island)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  island_id!: number;

  @BelongsTo(() => Island)
  island!: Island;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  description?: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  type!: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  order!: number;

  // personagens (por versão) que participaram deste evento
  @BelongsToMany(() => CharacterVersion, () => EventParticipant)
  participants!: CharacterVersion[];
}
