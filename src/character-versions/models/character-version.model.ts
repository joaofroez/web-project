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
} from 'sequelize-typescript';
import { Character } from '../../characters/models/character.model';

@Table({ tableName: 'CharacterVersions', timestamps: true, paranoid: true })
export class CharacterVersion extends Model {
  @PrimaryKey @AutoIncrement @Column(DataType.INTEGER) id!: number;

  @ForeignKey(() => Character)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  character_id!: number;

  @BelongsTo(() => Character)
  character!: Character;

  // Soft Link para Arc
  @AllowNull(false)
  @Column(DataType.INTEGER)
  arc_id!: number;

  @AllowNull(true) @Column(DataType.STRING) alias!: string;

  @AllowNull(true) @Column(DataType.STRING) epithet!: string;

  @AllowNull(true) @Column(DataType.BIGINT) bounty!: number;

  @AllowNull(true) @Column(DataType.STRING) status!: string;

  @AllowNull(true) @Column(DataType.STRING) image_url!: string;

  @AllowNull(true) @Column(DataType.TEXT) description!: string;
}
