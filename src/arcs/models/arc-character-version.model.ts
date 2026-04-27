import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';

import { Arc } from './arc.model';
import { CharacterVersion } from '../../character-versions/models/character-version.model';

@Table({
  tableName: 'arc_character_versions',
  timestamps: true,
  paranoid: true,
})
export class ArcCharacterVersion extends Model {
  @ForeignKey(() => Arc)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  arc_id!: number;

  @ForeignKey(() => CharacterVersion)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  character_version_id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  order!: number;
}
